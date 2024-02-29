import fs from 'fs'

import config from 'config'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'

import File, { FileDoc } from '@/core/models/File'
import User, { UserDoc } from '@/core/models/User'
import { FileService } from '@/core/services/fileService'

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
            // Ищем фаилы по id пользователя(получаем из token'а) и id родительской папки(получаем параметром из строки запроса)
            const files = await File.find({
                user: req.user?.id,
                parent: req.query.parent,
            })
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

            // Проверяем если хватает места на диске
            if (user.diskSpace && user.usedSpace) {
                if (user.usedSpace + file.size > user.diskSpace) {
                    return res
                        .status(400)
                        .json({ message: 'There no space on the disk' })
                }
                user.usedSpace = (user?.usedSpace || 0) + (file?.size || 0)
            }

            // Путь файла
            const path = parent
                ? `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
                : `${config.get('filePath')}\\${user._id}\\${file.name}`

            // Проверяем если есть уже такой файл, по такому-то пути
            if (fs.existsSync(path)) {
                return res.status(400).json({ message: 'File already exists' })
            }

            // Перемещаем файл по пути созданному выше
            file?.mv(path)

            // Получаем тип файла, его расширение
            const type = file?.name.split('.').pop()

            // Создаём модель файла и передаём все необходимые параметры
            const dbFile: FileDoc = new File({
                name: file?.name,
                type,
                size: file?.size,
                path: parent?.path,
                parent: parent?._id,
                user: user?._id,
            })
            // Сохраняем файл в базе данных
            await dbFile.save()
            // Также сохраняем пользователя поскольку мы меняли у него поля
            await user.save()

            // Отправляем данные о файле обратно на client
            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: 'Upload error' })
        }
    }
}
