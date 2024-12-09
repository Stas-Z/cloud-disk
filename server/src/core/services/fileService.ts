/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
import fs from 'fs'
import path from 'path'

import { Types } from 'mongoose'

import { FileController } from '@/application/controllers/fileController'
import { appConfig } from '@/infrastructure/config/config'

import File, { FileDoc } from '../models/File'
import User, { UserDoc } from '../models/User'

export class FileService {
    // Функция для создания папки
    static createDir(
        file: FileDoc,
        staticFolder?: boolean,
    ): Promise<{ message: string }> {
        const { filePath } = appConfig
        const { staticPath } = appConfig
        // Путь к файлу который мы будем создавать: {хранилище}\{папка пользователя(id)}\{путь к файлу}
        let totalFilePath: string
        totalFilePath = path.join(
            filePath,
            file.user?.toString() || '',
            file.path || '',
        )
        if (staticFolder) {
            // Cоздания статической папки
            totalFilePath = path.join(
                staticPath,
                file.user?.toString() || '',
                file.path || '',
            )
        }
        return new Promise<{ message: string }>((resolve, reject) => {
            try {
                // Проверяем если такой файл существует
                if (!fs.existsSync(totalFilePath)) {
                    fs.mkdirSync(totalFilePath) // создаём файл
                    return resolve({ message: 'File was created' })
                }
                return reject({
                    message:
                        'A file or folder with the same name already exists in this directory',
                })
            } catch (e) {
                const error = new Error('File error')
                reject(error)
            }
        })
    }

    static deleteFile(file: FileDoc) {
        // Физический путь до файла
        const path = this.getPath(file)
        if (fs.existsSync(path)) {
            if (file.type === 'dir') {
                // Если тип файла - директория (папка), вызываем рекурсивное удаление
                this.deleteFolderRecursive(path)
            } else {
                // Если это файл, вызываем fs.unlinkSync() для его удаления
                fs.unlinkSync(path)
            }
        }
    }

    static getPath(file: FileDoc) {
        // Получение физического пути до файла
        return path.join(
            appConfig.filePath,
            file.user?.toString() || '',
            file.path || '',
        )
    }

    static deleteFolderRecursive(path: string) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((fileItem) => {
                const currentPath = `${path}/${fileItem}`
                if (fs.lstatSync(currentPath).isDirectory()) {
                    // Рекурсивно вызываем deleteFolderRecursive для каждого элемента папки
                    this.deleteFolderRecursive(currentPath)
                } else {
                    // Если это файл, удаляем его
                    fs.unlinkSync(currentPath)
                }
            })
            // Удаляем саму папку после удаления её содержимого
            fs.rmdirSync(path)
        }
    }

    // Для Пет проекта. Файлы хранятся 1 день, потом удаляются
    static async deleteOutdatedFiles(userId: string) {
        try {
            // Находим файлы, которые устарели и нужно удалить
            const outdatedFiles = await File.find({
                user: userId,
                date: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
            })
            const user: UserDoc | null = await User.findOne({
                _id: userId,
            })

            if (!outdatedFiles) return

            // Удаляем каждый устаревший файл
            await Promise.all(
                outdatedFiles.map(async (file) => {
                    // Находим родительскую папку
                    const parentFolder = await File.findOne({
                        _id: file.parent,
                    })

                    // Рекурсивно удаляем всех дочерних элементов
                    await this.deleteFile(file)

                    // Рекурсивно удаляем всех дочерних элементов
                    await FileController.deleteChildFiles(file)

                    // Удаляем модель файла из базы данных
                    await file.deleteOne()

                    if (parentFolder && parentFolder.childs) {
                        // Удаляем идентификатор удаленного файла из массива childs родительской папки
                        parentFolder.childs = parentFolder.childs.filter(
                            (childId) =>
                                childId.toString() !== file._id.toString(),
                        ) as [Types.ObjectId]

                        await parentFolder.save()
                    }
                    if (user && file.size && user.usedSpace) {
                        user.usedSpace -= file.size
                        // Сохраняем пользователя поскольку мы меняли у него поля
                        await user.save()
                    }
                }),
            )
        } catch (error) {
            console.error('Error deleting outdated files:', error)
        }
    }
}
