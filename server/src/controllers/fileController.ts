import { Response } from 'express'

import File from '@/models/File'
import { UserAuthRequest } from '@/models/User'
import { FileService } from '@/services/fileService'

export class FileController {
    static async createDir(req: UserAuthRequest, res: Response) {
        try {
            // Получаем данные из тела запроса
            const { name, type, parent } = req.body
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

    static async getFiles(req: UserAuthRequest, res: Response) {
        try {
            // Ищем фаилы по id пользователя(получаем из token'а) и id родительской папки(получаем параметром из строки запроса)
            const files = await File.find({
                user: req.user?.id,
                parent: req.query.parent,
            })
            // Возвращаем файлы обратно на клиент
            return res.json({ files })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Can't get files" })
        }
    }
}
