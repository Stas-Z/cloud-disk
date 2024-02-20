/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-promise-executor-return */
import fs from 'fs'

import config from 'config'

import { FileDoc } from '../models/File'

export class FileService {
    // Функция для создания папки
    static createDir(file: FileDoc): Promise<{ message: string }> {
        // Путь к файлу который мы будем создавать: {хранилище}\{папка пользователя(id)}\{путь к файлу}
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise<{ message: string }>((resolve, reject) => {
            try {
                // Проверяем если такой файл существует
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath) // создаём файл
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
}