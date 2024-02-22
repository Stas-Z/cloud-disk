import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getCurrentDir = (state: StateSchema) =>
    state.file?.currentDir ?? ''

export const getFileName = (state: StateSchema) => state.file?.fileName || ''

export const getDirStack = (state: StateSchema) => state.file?.dirStack || []

export const getFilesWithoutLast = createSelector(getDirStack, (dirStack) =>
    dirStack.slice(0, -1),
)

export const getLastFileId = createSelector(
    getDirStack,
    (dirStack) => dirStack[dirStack.length - 1],
)

export const getScrollSave = (state: StateSchema) => state.file.scroll
export const getScrollSaveByDir = createSelector(
    getScrollSave,
    (state: StateSchema, pathDir: string) => pathDir,
    (scroll, pathDir) => scroll[pathDir] || '0',
)
