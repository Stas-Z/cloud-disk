import config from 'config'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface UserAuthRequest extends Request {
    user?: string | JwtPayload
}

function auth(req: JwtPayload, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ message: 'Auth error' })
        }
        const splitToken = token.split(' ')[1]

        const decoded = jwt.verify(splitToken, config.get('secretKey'))
        req.user = decoded
        console.log(req.user)

        next()
    } catch (e) {
        return res.status(401).json({ message: 'Auth error' })
    }
}

export default auth
