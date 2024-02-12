export interface User {
    id: string
    email: string
    token: string
    diskSpace?: number
    usedSpace?: number
}

export interface UserSchema {
    currentUser?: User
    isAuth: boolean
}
