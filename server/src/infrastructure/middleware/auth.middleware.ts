import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { appConfig } from '@/infrastructure/config/config'

const { secretKey } = appConfig

function auth(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).send({ message: 'Auth error' })
        }
        const splitToken = token.split(' ')[1]

        const decoded = jwt.verify(splitToken, secretKey) as JwtPayload
        req.user = decoded

        next()
    } catch (e) {
        return res.status(401).send({ message: 'Auth error' })
    }
}

export default auth
