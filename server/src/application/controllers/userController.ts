import fs from 'fs'

import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { validationResult } from 'express-validator'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import File from '@/core/models/File'
import User, { UserDoc } from '@/core/models/User'
import { FileService } from '@/core/services/fileService'
import { MappedErrors, filterMessages } from '@/helpers/errorFilterMessage'
import { appConfig } from '@/infrastructure/config/config'

const { secretKey } = appConfig
const SECRET_KEY: Secret = secretKey

export class UserController {
    static async Registration(req: Request, res: Response) {
        try {
            // Получаем результат валидации
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const mapedErrors = filterMessages(
                    errors.mapped() as MappedErrors,
                )

                console.log(mapedErrors)

                return res.status(400).json({ message: mapedErrors, errors })
            }

            // Получим email и пароль из тела запроса
            const { email, password } = req.body

            // Проверяем если есть такой пользователь в базе
            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({
                    message: `Error: This email is already registered`,
                })
            }

            // Создаём нового пользователя
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword })
            await user.save()
            // Создаём папку для пользователя с именем id пользователя
            await FileService.createDir(new File({ user: user.id, name: '' }))
            await FileService.createDir(
                new File({ user: user.id, name: '' }),
                true,
            )
            return res.json({ message: 'Profile created successfully' })
        } catch (e) {
            console.log(e)
            res.send({ message: 'Server error' })
        }
    }

    static async Login(req: Request, res: Response) {
        try {
            // Получим email и пароль из тела запроса
            const { email, password } = req.body

            // Проверяем если есть такой пользователь в базе
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: 'Email not found' })
            }

            // Сравниваем пароли
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: 'Invalid password' })
            }

            const token = jwt.sign({ id: user }, SECRET_KEY, {
                expiresIn: '1h',
            })
            return res.json({
                token,
                id: user.id,
                email: user.email,
                username: user.username,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            })
        } catch (e) {
            console.log(e)
            res.send({ message: 'Server error' })
        }
    }

    static async Authorization(req: JwtPayload, res: Response) {
        try {
            const user = await User.findOne({ _id: req.user.id })
            if (!user) {
                return
            }

            const token = jwt.sign({ id: user }, SECRET_KEY, {
                expiresIn: '1h',
            })
            return res.json({
                token,
                id: user.id,
                email: user.email,
                username: user.username,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            })
        } catch (e) {
            console.log(e)
            res.send({ message: 'Server error' })
        }
    }

    static async updateUserUsedSpace(req: Request, res: Response) {
        try {
            // Получаем userId из параметров запроса
            const userId = req.user ? req.user.id : null

            // Получаем новое значение usedSpace из тела запроса
            const { usedSpace } = req.body

            // Находим пользователя
            const user: UserDoc | null = await User.findOne({
                _id: userId,
            })

            // Проверяем, найден ли пользователь
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            // Обновляем поле usedSpace у пользователя
            user.usedSpace += usedSpace
            // Сохраняем обновленного пользователя
            await user.save()

            // Отправляем успешный ответ
            res.status(200).json({ message: 'Used space updated successfully' })
        } catch (error) {
            console.error('Error updating used space:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getUser(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id)

            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            // Возвращаем файлы обратно на клиент
            return res.json({
                id: user.id,
                email: user.email,
                username: user.username,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Can't get user" })
        }
    }

    static async updateUser(req: Request, res: Response) {
        try {
            const userUpdate = req.body

            const user = await User.findById(req.user.id)

            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Invalid email address', errors })
            }

            user.email = userUpdate.email
            user.username = userUpdate.username
            user.avatar = userUpdate.avatar

            await user.save()

            // Возвращаем файлы обратно на клиент
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Can't get user" })
        }
    }

    static async uploadAvatar(req: Request, res: Response) {
        try {
            // Получаем файл из запроса
            const file = req.files?.file as UploadedFile

            const userId = req.user ? req.user.id : null

            const user: UserDoc | null = await User.findOne({
                _id: userId,
            })

            if (!file || !user) {
                return res
                    .status(400)
                    .json({ message: 'No file provided or user not found' })
            }

            const oldAvatarName = user.avatar
            if (oldAvatarName) {
                fs.unlinkSync(
                    `${appConfig.staticPath}\\${user.id}\\${oldAvatarName}`,
                )
            }

            const avatarName = `${uuidv4()}.jpg`

            file.mv(`${appConfig.staticPath}\\${user.id}\\${avatarName}`)

            user.avatar = avatarName

            await user.save()

            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Upload avatar error' })
        }
    }

    static async deleteAvatar(req: Request, res: Response) {
        try {
            const user = await User.findById(req.user.id)

            if (!user) {
                return res.status(400).json({ message: 'User not found' })
            }

            fs.unlinkSync(`${appConfig.staticPath}\\${user.id}\\${user.avatar}`)

            user.avatar = undefined

            await user.save()
            return res.json(user)
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Delete avatar error' })
        }
    }
}
