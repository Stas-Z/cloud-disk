import path, { resolve } from 'path'

import { config } from 'dotenv'

config({
    path: resolve(__dirname, './config.env'),
})

export const serverPort = 5000
export const dbUrl = process.env.DB_URL
export const secretKey = process.env.SECRET_KEY
export const filePath = path.resolve(__dirname, '../files')
export const staticPath = path.resolve(__dirname, '../static')

export interface AppConfig {
    serverPort: number
    dbUrl: string
    secretKey: string
    filePath: string
    staticPath: string
}
