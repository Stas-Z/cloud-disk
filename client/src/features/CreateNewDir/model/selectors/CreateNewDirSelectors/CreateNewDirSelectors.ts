import { StateSchema } from '@/app/providers/StoreProvider'

export const getFileIsLoading = (state: StateSchema) =>
    state.createNewDir?.isLoading || false
export const getFileOnSucces = (state: StateSchema) =>
    state.createNewDir?.onSucces || false
export const getFileError = (state: StateSchema) =>
    state.createNewDir?.error || ''
