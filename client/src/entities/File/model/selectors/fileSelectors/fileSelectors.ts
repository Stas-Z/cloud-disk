import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getFileIsLoading = (state: StateSchema) =>
    state.file.isLoading || false

export const getCurrentDir = (state: StateSchema) =>
    state.file?.currentDir ?? ''

export const getFileName = (state: StateSchema) => state.file?.dirName || ''

export const getSelectedFile = (state: StateSchema) => state.file.selectedFile
export const getSelectedFileId = createSelector(
    [getSelectedFile],
    (selectedFile) => selectedFile?._id,
)
export const getSelectedFileName = createSelector(
    [getSelectedFile],
    (selectedFile) => selectedFile?.name,
)
