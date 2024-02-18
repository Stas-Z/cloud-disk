import { StateSchema } from '@/app/providers/StoreProvider'

export const getFileIsLoading = (state: StateSchema) =>
    state.userFiles?.isLoading || false
export const getFileError = (state: StateSchema) => state.userFiles?.error || ''
