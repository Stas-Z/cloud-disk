/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
import fs from 'fs'

import { appConfig } from '@/infrastructure/config/config'

import { FileDoc } from '../models/File'

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
        totalFilePath = `${filePath}\\${file.user}\\${file.path}`
        if (staticFolder) {
            // Cоздания статической папки
            totalFilePath = `${staticPath}\\${file.user}\\${file.path}`
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
        return `${appConfig.filePath}\\${file.user}\\${file.path}`
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
}
