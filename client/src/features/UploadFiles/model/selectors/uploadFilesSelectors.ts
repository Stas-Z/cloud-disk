import { StateSchema } from '@/app/providers/StoreProvider'

export const getUploadFilesIsLoading = (state: StateSchema) =>
    state.uploadFiles?.isLoading || false
export const getUploadFilesOnSucces = (state: StateSchema) =>
    state.uploadFiles?.onSucces || false
export const getUploadFilesError = (state: StateSchema) =>
    state.uploadFiles?.error || ''
