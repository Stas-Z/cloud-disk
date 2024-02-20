import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FileSchema } from '../types/fileSchema'

const initialState: FileSchema = {
    currentDir: null,
    fileName: '',
    dirStack: [],
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload
        },
        setCurrentDir: (state, action: PayloadAction<number | null>) => {
            state.currentDir = action.payload
        },

        pushToDirStack: (state, action: PayloadAction<number>) => {
            state.dirStack = [...state.dirStack, action.payload]
        },
        setDirStack: (state, action: PayloadAction<number[]>) => {
            state.dirStack = action.payload
        },
        sliceDirStackById: (state, action: PayloadAction<number>) => {
            const dirStackToDelete = state.dirStack.findIndex(
                (dirStack) => dirStack === action.payload,
            )
            if (action.payload === null) {
                state.dirStack = []
            }
            if (dirStackToDelete !== -1) {
                state.dirStack = [...state.dirStack.slice(0, dirStackToDelete)]
            }
        },
    },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
