import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FileSchema } from '../types/fileSchema'

const initialState: FileSchema = {
    currentDir: null,
    fileName: 'New Folder',
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload
        },
        setCurrentDir: (state, action: PayloadAction<number>) => {
            state.currentDir = action.payload
        },
    },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
