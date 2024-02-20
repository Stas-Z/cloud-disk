import config from 'config'
import express from 'express'
import mongoose from 'mongoose'

import corsMiddleware from './middleware/cors.middleware'
import authRouter from './routes/auth.routes'
import fileRouter from './routes/file.routes'

const app = express()
const PORT = config.get('serverPort')

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