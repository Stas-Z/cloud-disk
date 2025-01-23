import Router from 'express'

import authMiddleware from '@/infrastructure/middleware/auth.middleware'

import { UserController } from '../controllers/userController'
import { UserValidator } from '../validators/userValidator'

// Маршруты для регистрации и авторизации пользователя

const router = Router()

router.post(
    '/registration',
    UserValidator.userOptions(),
    UserController.Registration,
)
router.post('/login', UserController.Login)
router.post('/avatar', authMiddleware, UserController.uploadAvatar)
router.post(
    '/profile',
    authMiddleware,
    UserValidator.userOptions(),
    UserController.updateUser,
)
router.get('/auth', authMiddleware, UserController.Authorization)
router.get('/profile', authMiddleware, UserController.getUser)

router.delete('/avatar', authMiddleware, UserController.deleteAvatar)

router.patch('/userSpace', authMiddleware, UserController.updateUserUsedSpace)

export default router
