import { RouteProps } from 'react-router-dom'

// Расширяем RouteProps флагом authOnly, для проверки авторизации пользователя

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}
