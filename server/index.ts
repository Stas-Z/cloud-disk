import config from 'config'
import express from 'express'
import mongoose from 'mongoose'

import corsMiddleware from './src/middleware/cors.middleware'
import authRouter from './src/routes/auth.routes'

const app = express()
const PORT = config.get('serverPort')

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try {
        // Подключаемся к базе данных
        mongoose.connect(config.get('dbUrl'))

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
