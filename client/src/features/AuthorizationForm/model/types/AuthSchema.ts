import { AuthType } from '../consts/authConsts'

export interface AuthSchema {
    email: string
    password: string
    isLoading: boolean
    error?: string
    succes?: string
    view: AuthType
}
