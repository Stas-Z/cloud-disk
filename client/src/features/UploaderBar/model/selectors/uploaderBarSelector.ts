import { StateSchema } from '@/app/providers/StoreProvider'

export const getUploaderBarFiles = (state: StateSchema) =>
    state.uploaderBar.uploadedFiles
