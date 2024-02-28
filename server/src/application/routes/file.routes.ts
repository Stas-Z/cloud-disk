import Router from 'express'

import { FileController } from '@/application/controllers/fileController'
import authMiddleware from '@/infrastructure/middleware/auth.middleware'

const router = Router()

router.post('', authMiddleware, FileController.createDir)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.get('', authMiddleware, FileController.getFiles)

export default router
