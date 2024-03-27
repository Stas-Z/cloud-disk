import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getFileIsLoading = (state: StateSchema) =>
    state.file.isLoading || false

export const getCurrentDir = (state: StateSchema) =>
    state.file?.currentDir ?? ''

export const getFileName = (state: StateSchema) => state.file?.dirName || ''
export const getNoticeFileName = (state: StateSchema) =>
    state?.file.dirNameNotice || ''

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
    (scroll, pathDir) => scroll[pathDir] || '',
)

export const getSelectedFile = (state: StateSchema) => state.file.selectedFile
export const getSelectedFileId = createSelector(
    [getSelectedFile],
    (selectedFile) => selectedFile?._id,
)
export const getSelectedFileName = createSelector(
    [getSelectedFile],
    (selectedFile) => selectedFile?.name,
)
