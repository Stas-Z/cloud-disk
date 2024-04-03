import Router from 'express'

import { FileController } from '@/application/controllers/fileController'
import authMiddleware from '@/infrastructure/middleware/auth.middleware'

const router = Router()

router.post('', authMiddleware, FileController.createDir)
router.post('/upload', authMiddleware, FileController.uploadFile)
router.post('/uploadArray', authMiddleware, FileController.uploadFilesArray)

router.get('', authMiddleware, FileController.getFiles)
router.get('/download', authMiddleware, FileController.downloadFile)

router.delete('/', authMiddleware, FileController.deleteFile)

export default router
