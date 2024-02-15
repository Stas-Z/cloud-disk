import { StateSchema } from '@/app/providers/StoreProvider'

export const getFileCurrentDir = (state: StateSchema) =>
    state.filesPage.currentDir ?? ''
