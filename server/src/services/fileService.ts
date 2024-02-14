import fs from 'fs'

import config from 'config'

import { FileDoc } from '../models/File'

export class FileService {
    // Функция для создания папки
    static createDir(file: FileDoc) {
        // Путь к файлу который мы будем создавать: {хранилище}\{папка пользователя(id)}\{путь к файлу}
        const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
        return new Promise((resolve, reject) => {
            try {
                // Проверяем если такой файл существует
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath) // создаём файл
                    resolve({ message: 'File was created' })
                } else {
                    const error = new Error('File already exists')
                    reject(error)
                }
            } catch (e) {
                const error = new Error('File error')
                reject(error)
            }
        })
    }
}
