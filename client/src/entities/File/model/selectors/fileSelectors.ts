import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentDir = (state: StateSchema) =>
    state.file?.currentDir || null

export const getFileName = (state: StateSchema) => state.file.fileName

export const getDirStack = (state: StateSchema) => state.file.dirStack

export const getCurrentFileName = (state: StateSchema) =>
    state.file.currentFileName
