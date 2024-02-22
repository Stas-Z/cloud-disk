import bcrypt from 'bcryptjs'
import config from 'config'
import Router, { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

import { MappedErrors, filterMessages } from '@/helpers/errorFilterMessage'
import authMiddleware from '@/middleware/auth.middleware'
import File from '@/models/File'
import User from '@/models/User'
import { FileService } from '@/services/fileService'

const SECRET_KEY: Secret = config.get('secretKey')

// Маршруты для регистрации и авторизации пользователя

const router = Router()

// Валидируем данные
const validate = [
    check('email', 'Invalid email address').isEmail(),
    check(
        'password',
        'Password must be longer than 3 and shorter than 12 characters in length',
    ).isLength({ min: 3, max: 12 }),
]

router.post('/registration', validate, async (req: Request, res: Response) => {
    try {
        // Получаем результат валидации
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const mapedErrors = filterMessages(errors.mapped() as MappedErrors)

            console.log(mapedErrors)

            return res.status(400).json({ message: mapedErrors, errors })
        }

        // Получим email и пароль из тела запроса
        const { email, password } = req.body

        // Проверяем если есть такой пользователь в базе
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res
                .status(400)
                .json({ message: `Error: This email is already registered` })
        }

        // Создаём нового пользователя
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({ email, password: hashPassword })
        await user.save()
        // Создаём папку для пользователя с именем id пользователя
        await FileService.createDir(new File({ user: user.id, name: '' }))
        return res.json({ message: 'Profile created successfully' })
    } catch (e) {
        console.log(e)
        res.send({ message: 'Server error' })
    }
})

router.post('/login', async (req, res) => {
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

        const token = jwt.sign({ id: user }, SECRET_KEY, { expiresIn: '1h' })
        return res.json({
            token,
            id: user.id,
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.avatar,
        })
    } catch (e) {
        console.log(e)
        res.send({ message: 'Server error' })
    }
})

router.get('/auth', authMiddleware, async (req: JwtPayload, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        if (!user) {
            return
        }

        const token = jwt.sign({ id: user }, SECRET_KEY, { expiresIn: '1h' })
        return res.json({
            token,
            id: user.id,
            email: user.email,
            diskSpace: user.diskSpace,
            usedSpace: user.usedSpace,
            avatar: user.avatar,
        })
    } catch (e) {
        console.log(e)
        res.send({ message: 'Server error' })
    }
})

export default router
