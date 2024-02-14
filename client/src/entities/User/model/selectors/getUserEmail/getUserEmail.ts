import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserEmail = (state: StateSchema) =>
    state.user.currentUser?.email
