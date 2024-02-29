import config from 'config'
import express from 'express'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'

import authRouter from './application/routes/auth.routes'
import fileRouter from './application/routes/file.routes'
import corsMiddleware from './infrastructure/middleware/cors.middleware'

const app = express()
const PORT = config.get('serverPort')

app.use(fileUpload({ defCharset: 'utf8', defParamCharset: 'utf8' }))
app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
    try {
        // Подключаемся к базе данных
        await mongoose.connect(config.get('dbUrl'))

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
