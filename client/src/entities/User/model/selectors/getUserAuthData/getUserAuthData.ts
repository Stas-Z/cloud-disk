import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserAuthData = (state: StateSchema) => state.user.isAuth
export const getUserData = (state: StateSchema) => state.user.currentUser
