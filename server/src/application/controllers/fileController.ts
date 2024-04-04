/* eslint-disable no-await-in-loop */
import fs from 'fs'

import archiver from 'archiver'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import mongoose, { Types } from 'mongoose'

import File, { FileDoc } from '@/core/models/File'
import User, { UserDoc } from '@/core/models/User'
import { FileService } from '@/core/services/fileService'
import { appConfig } from '@/infrastructure/config/config'

interface CreateDirRequest {
    name: string
    type: string
    parent: string
}

export class FileController {
    static async createDir(req: Request, res: Response) {
        try {
            // Получаем данные из тела запроса
            const { name, type, parent }: CreateDirRequest = req.body
            // Создаём новый фаил и передаём в него данные из запроса выше
            const file = new File({
                name,
                type,
                parent,
                user: req.user?.id,
            })
            // Находим родительский файл по id полученному из запроса
            const parentFile = await File.findOne({ _id: parent })

            if (!parentFile) {
                // Если родительский файл не найден, то файл будет добавлен в корневую директорию
                file.path = name
                await FileService.createDir(file)
            } else {
                // В обратном случае {родительский путь}\{имя файла}
                file.path = `${parentFile.path}\\${file.name}`
                await FileService.createDir(file)
                // Пушим id только что созданного нового файла в массив родительского фаила childs
                parentFile.childs?.push(file._id)
                await parentFile.save()
            }
            // Сохраняем файл
            await file.save()
            // Возвращаем файл в ответе от сервера
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    static async getFiles(req: Request, res: Response) {
        try {
            // Удаление устаревших файлов перед получением нового списка файлов
            await FileService.deleteOutdatedFiles(req.user?.id)

            const { sort } = req.query

            let files
            // Применяем сортировку, если указан параметр сортировки
            if (sort && typeof sort === 'string') {
                files = await File.find({
                    user: req.user?.id,
                    parent: req.query.parent,
                }).sort({ [sort]: 1 })
            } else {
                files = await File.find({
                    user: req.user?.id,
                    parent: req.query.parent,
                })
            }

            const searchName = req.query.search as string

            // Если есть параметр поиска, фильтруем все файлы пользователя
            if (searchName && searchName.length > 1) {
                let searchFiles
                // Применяем сортировку, если указан параметр сортировки
                if (sort && typeof sort === 'string') {
                    searchFiles = await File.find({
                        user: req.user?.id,
                    }).sort({ [sort]: 1 })
                } else {
                    searchFiles = await File.find({
                        user: req.user?.id,
                    })
                }
                const sendFiles = searchFiles.filter(
                    (file) =>
                        file.name.includes(searchName) && file.type !== 'dir',
                )
                // Возвращаем файлы обратно на клиент
                return res.json(sendFiles)
            }

            // Возвращаем файлы обратно на клиент
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Can't get files" })
        }
    }

    static async uploadFile(req: Request, res: Response) {
        try {
            // Получаем файл из запроса
            const file = req.files?.file as UploadedFile

            const userId = req.user ? req.user.id : null

            // Находим родительскую директорию в которую сохраняем файл.
            const parent: FileDoc | null = await File.findOne({
                // Ищем по id user'а из токена и по id самой директории которую мы передаём в теле запроса
                user: userId,
                _id: req.body.parent,
            })

            // Находим пользователя
            const user: UserDoc | null = await User.findOne({
                _id: userId,
            })

            if (!file || !user) {
                return res
                    .status(400)
                    .json({ message: 'No file provided or user not found' })
            }

            // Путь файла
            const path = parent
                ? `${appConfig.filePath}\\${user._id}\\${parent.path}\\${file.name}`
                : `${appConfig.filePath}\\${user._id}\\${file.name}`

            // Проверяем если есть уже такой файл, по такому-то пути
            if (fs.existsSync(path)) {
                return res.status(400).json({ message: 'File already exists' })
            }

            // Проверяем если хватает места на диске
            if (user.diskSpace) {
                if ((user.usedSpace || 0) + file.size > user.diskSpace) {
                    return res
                        .status(400)
                        .json({ message: 'There no space on the disk' })
                }
            }

            // Перемещаем файл по пути созданному выше
            file?.mv(path)

            // Получаем тип файла, его расширение
            const type = file?.name.split('.').pop()

            let newFilePath = file.name
            // Если есть родитель, добавляем в путь
            if (parent) {
                newFilePath = `${parent.path}\\${file.name}`
            }

            // Создаём модель файла и передаём все необходимые параметры
            const dbFile: FileDoc = new File({
                name: file?.name,
                type,
                size: file?.size,
                path: newFilePath,
                parent: parent?._id,
                user: user?._id,
            })

            if (parent) {
                // Пушим id только что добавленного нового файла в массив родительского фаила childs
                parent.childs?.push(dbFile._id)
                await parent.save()
            }

            // Сохраняем файл в базе данных
            await dbFile.save()

            // Отправляем данные о файле обратно на client
            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Upload error' })
        }
    }

    static async getArrayTotalSize(files: {
        [key: string]: UploadedFile[]
    }): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let totalSize = 0
            Object.values(files).forEach((fileGroup) => {
                fileGroup.forEach((file) => {
                    totalSize += file.size
                })
            })
            resolve(totalSize)
        })
    }

    static async uploadFilesArray(req: Request, res: Response) {
        try {
            // Получаем массив файлов из запроса
            const { files } = req

            const userId = req.user ? req.user.id : null

            // Находим пользователя
            const user: UserDoc | null = await User.findOne({
                _id: userId,
            })

            if (!files || !user) {
                return res
                    .status(400)
                    .json({ message: 'No files provided or user not found' })
            }

            const parentFilesMap: { [parentId: string]: UploadedFile[] } = {}

            // Получаем массив файлов из запроса
            Object.keys(files).forEach((key) => {
                const fileOrFiles = files[key]
                // Проверяем, является ли fileOrFiles массивом
                if (Array.isArray(fileOrFiles)) {
                    // Если является, то просто добавляем его к массиву в parentFilesMap
                    parentFilesMap[key] = parentFilesMap[key]
                        ? [...parentFilesMap[key], ...fileOrFiles]
                        : [...fileOrFiles]
                } else {
                    // Если не является массивом, создаем массив из одного файла и добавляем к массиву в parentFilesMap
                    parentFilesMap[key] = parentFilesMap[key]
                        ? [...parentFilesMap[key], fileOrFiles]
                        : [fileOrFiles]
                }
            })
            const totalSize =
                await FileController.getArrayTotalSize(parentFilesMap)

            // Проверяем, достаточно ли места на диске для всех файлов
            if (
                user.diskSpace &&
                (user.usedSpace || 0) + totalSize > user.diskSpace
            ) {
                return res
                    .status(400)
                    .json({ message: 'There is not enough space on the disk' })
            }

            // Создаем массив для сохранения всех созданных файлов
            const savedFiles: FileDoc[] = []

            // Создаем объект для хранения соответствия родительской папки и ее дочерних элементов
            const parentChildMap: { [parentId: string]: string[] } = {}

            // Обрабатываем каждую родительскую папку и ее файлы
            await Promise.all(
                Object.keys(files).map(async (key) => {
                    const parentId = key.split('_').pop() // Получаем id parent из ключа
                    let filesGroup = files[key]

                    // Если filesGroup не является массивом, преобразуем его в массив
                    if (!Array.isArray(filesGroup)) {
                        filesGroup = [filesGroup]
                    }

                    if (Array.isArray(filesGroup)) {
                        // Проходим по каждому файлу в группе файлов
                        await Promise.all(
                            filesGroup.map(async (file) => {
                                // Находим родительскую директорию в которую сохраняем файлы.
                                const parent: FileDoc | null =
                                    await File.findOne({
                                        // Ищем по id user'а из токена и по id самой директории которую мы передаём в теле запроса
                                        user: userId,
                                        _id: parentId,
                                    })

                                // Путь файла
                                const path = parent
                                    ? `${appConfig.filePath}\\${user._id}\\${parent.path}\\${file.name}`
                                    : `${appConfig.filePath}\\${user._id}\\${file.name}`

                                // Проверяем, существует ли уже такой файл по указанному пути
                                if (fs.existsSync(path)) {
                                    throw new Error('File already exists')
                                }

                                // Перемещаем файл по пути созданному выше
                                file?.mv(path)

                                // Получаем тип файла, его расширение
                                const type = file?.name.split('.').pop()

                                let newFilePath = file.name
                                // Если есть родитель, добавляем в путь
                                if (parent) {
                                    newFilePath = `${parent.path}\\${file.name}`
                                }

                                // Создаём модель файла и передаём все необходимые параметры
                                const dbFile: FileDoc = new File({
                                    name: file?.name,
                                    type,
                                    size: file?.size,
                                    path: newFilePath,
                                    parent: parent?._id,
                                    user: user?._id,
                                })
                                // Добавляем id файла в массив дочерних элементов соответствующей родительской папки в parentChildMap
                                if (parent) {
                                    parentChildMap[parent._id.toString()] =
                                        parentChildMap[parent._id.toString()] ||
                                        []
                                    parentChildMap[parent._id.toString()].push(
                                        String(dbFile._id),
                                    )
                                }

                                await dbFile.save()
                                savedFiles.push(dbFile)
                            }),
                        )
                    }
                }),
            )

            // Обновляем использованное место на диске пользователя
            if (user.diskSpace) {
                user.usedSpace = (user.usedSpace || 0) + totalSize
                await user.save()
            }

            // Обновляем родительские файлы, добавляя в них массив дочерних элементов
            await Promise.all(
                Object.keys(parentChildMap).map(async (parentId) => {
                    const parentFile = await File.findById(parentId)
                    const childIds: Types.ObjectId[] = parentChildMap[
                        parentId
                    ].map((childId) => {
                        return new mongoose.Types.ObjectId(
                            childId,
                        ) as Types.ObjectId
                    })
                    if (
                        parentFile &&
                        parentFile.childs &&
                        Array.isArray(parentFile.childs) &&
                        childIds.length > 0
                    ) {
                        parentFile.childs.push(...childIds)
                        await parentFile.save()
                    }
                }),
            )

            // Отправляем данные о файлах обратно на клиент
            res.json(savedFiles)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Upload error' })
        }
    }

    static async downloadFile(req: Request, res: Response) {
        try {
            // Находим файл по id и пользователю
            const file = await File.findOne({
                _id: req.query.id,
                user: req.user.id,
            })

            if (!file) {
                return res.status(404).json({ message: 'File not found' })
            }

            // Путь до физического файла, который храниться на сервере.
            const path = FileService.getPath(file)

            // если файл является папкой, запаковываем в архив и отдаём на клиент
            if (file.type === 'dir') {
                // Создаем поток для записи данных в zip-архив
                const archive = archiver('zip', {
                    zlib: { level: 9 }, // уровень сжатия
                })

                // Отправляем zip-архив как ответ на запрос
                res.attachment(`${file.name}.zip`)
                archive.pipe(res)

                // Добавляем содержимое папки в zip-архив
                archive.directory(path, false)

                // Завершаем архивацию и отправляем архив клиенту
                archive.finalize()
            }

            if (file.type !== 'dir') {
                // Если файл существует отправляем обратно на клиент
                if (file && fs.existsSync(path)) {
                    return res.download(path, file.name)
                }

                return res.status(400).json({ message: 'Download error' })
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Download error' })
        }
    }

    static async deleteFile(req: Request, res: Response) {
        try {
            // Находим файл по id и пользователю
            const file = await File.findOne({
                _id: req.query.id,
                user: req.user.id,
            })

            if (!file) {
                return res.status(400).json({ message: 'file not found' })
            }

            const userId = req.user ? req.user.id : null
            // Находим пользователя
            const user: UserDoc | null = await User.findOne({
                _id: userId,
            })

            // Находим родительскую папку
            const parentFolder = await File.findOne({ _id: file.parent })

            // Удаляем физический файл который храниться на сервере
            FileService.deleteFile(file)

            // Рекурсивно удаляем всех дочерних элементов
            await FileController.deleteChildFiles(file)

            // Удаляем модель файла из базы данных
            await file.deleteOne()

            if (parentFolder && parentFolder.childs) {
                // Удаляем идентификатор удаленного файла из массива childs родительской папки
                parentFolder.childs = parentFolder.childs.filter(
                    (childId) => childId.toString() !== file._id.toString(),
                ) as [Types.ObjectId]

                await parentFolder.save()
            }
            if (user && file.size && user.usedSpace) {
                user.usedSpace -= file.size
                // Сохраняем пользователя поскольку мы меняли у него поля
                await user.save()
            }

            return res.json({ message: 'File was deleted' })
        } catch (e) {
            console.log(e)
            return res
                .status(400)
                .json({ message: 'The directory is not empty' })
        }
    }

    static async deleteChildFiles(file: FileDoc) {
        try {
            // Находим все дочерние файлы для данного файла
            const childFiles = await File.find({ parent: file._id })

            // Создаем массив промисов для удаления каждого дочернего файла и вычисления их размера
            // eslint-disable-next-line no-restricted-syntax
            for (const childFile of childFiles) {
                // Размер файла
                const fileSize = childFile.size || 0
                // Удаляем дочерний файл
                await childFile.deleteOne()

                // Вычитаем размер файла из использованного места пользователя
                if (fileSize > 0) {
                    const userId = childFile.user
                        ? childFile.user.toString()
                        : null
                    if (userId) {
                        const user = await User.findOne({ _id: userId })

                        if (user && user.usedSpace) {
                            user.usedSpace -= fileSize
                            await user.save()
                        }
                    }
                }

                // Рекурсивно удаляем все дочерние файлы для текущего файла
                await FileController.deleteChildFiles(childFile)
            }
        } catch (error) {
            console.error(`Error deleting child files: ${error}`)
        }
    }

    static async searchFile(req: Request, res: Response) {
        try {
            const searchName = req.query.search as string
            let files = await File.find({ user: req.user.id })
            files = files.filter((file) => file.name.includes(searchName))
            return res.json({ files })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Search error' })
        }
    }
}
