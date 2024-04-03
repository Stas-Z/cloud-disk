export interface User {
    id?: string
    email?: string
    token?: string
    diskSpace?: number
    usedSpace?: number
    avatar?: string
    username?: string
}

export interface UserSchema {
    currentUser?: User
    isAuth: boolean
}
