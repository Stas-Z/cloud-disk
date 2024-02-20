import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentDir = (state: StateSchema) =>
    state.file?.currentDir || null

export const getFileName = (state: StateSchema) => state.file?.fileName || ''

export const getDirStack = (state: StateSchema) => state.file?.dirStack || []

export const getFilesWithoutLast = createSelector(getDirStack, (dirStack) =>
    dirStack.slice(0, -1),
)

export const getLastFileId = createSelector(
    getDirStack,
    (dirStack) => dirStack[dirStack.length - 1],
)
