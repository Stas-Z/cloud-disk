import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserAuthData = (state: StateSchema) => state.user.isAuth

export const getUserData = (state: StateSchema) => state.user.currentUser

export const getUserDiskSpace = (state: StateSchema) => state.user.currentUser?.diskSpace || 0
export const getUserUsedSpace = (state: StateSchema) => state.user.currentUser?.usedSpace || 0

export const getUserFirstVisit = (state: StateSchema) => state.user.firstVisit
