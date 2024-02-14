import Router from 'express'

import { FileController } from '@/controllers/fileController'
import authMiddleware from '@/middleware/auth.middleware'

const router = Router()

router.post('', authMiddleware, FileController.createDir)
router.get('', authMiddleware, FileController.getFiles)

export default router
