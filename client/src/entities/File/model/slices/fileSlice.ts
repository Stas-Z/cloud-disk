import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FileSchema } from '../types/fileSchema'

const initialState: FileSchema = {
    currentDir: null,
    currentFileName: '',
    fileName: 'Новая папка',
    dirStack: [],
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
        setCurrentFileName: (state, action: PayloadAction<string>) => {
            state.currentFileName = action.payload
        },
        pushToStack: (state, action: PayloadAction<number>) => {
            state.dirStack = [...state.dirStack, action.payload]
        },
        popFromStack: (state, action: PayloadAction<number>) => {
            state.dirStack = state.dirStack.slice(0, action.payload)
        },
    },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
