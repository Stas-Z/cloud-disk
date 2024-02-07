import bcrypt from 'bcryptjs'
import config from 'config'
import Router, { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import jwt, { Secret } from 'jsonwebtoken'

import User from '../models/User'

const SECRET_KEY: Secret = config.get('secretKey')

// Маршруты для регистрации и авторизации пользователя

const router = Router()

// Валидируем данные
const validate = [
    check('email', 'Uncorrect email').isEmail(),
    check(
        'password',
        'Password must be longer than 3 and shorter than 12',
    ).isLength({ min: 3, max: 12 }),
]

router.post('/registration', validate, async (req: Request, res: Response) => {
    try {
        // Получаем результат валидации
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: 'Uncorrect request', errors })
        }

        // Получим email и пароль из тела запроса
        const { email, password } = req.body

        // Проверяем если есть такой пользователь в базе
        const candidate = await User.findOne({ email })

        if (candidate) {
            return res
                .status(400)
                .json({ message: `User with email ${email} already exist` })
        }

        // Создаём нового пользователя
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({ email, password: hashPassword })
        await user.save()
        return res.json({ message: 'User was created' })
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
            return res.status(404).json({ message: 'User not found' })
        }

        // Сравниваем пароли
        const isPassValid = bcrypt.compareSync(
            password,
            user.password as string,
        )
        if (!isPassValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = jwt.sign({ id: user }, SECRET_KEY, { expiresIn: '1h' })
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                diskSpace: user.diskSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar,
            },
        })
    } catch (e) {
        console.log(e)
        res.send({ message: 'Server error' })
    }
})

export default router
