import { resolve } from 'path'

import { config } from 'dotenv'

config({
    path: resolve(__dirname, '../config.env'),
})

export const serverPort = 5000
export const dbUrl = process.env.DB_URL
export const secretKey = process.env.SECRET_KEY
