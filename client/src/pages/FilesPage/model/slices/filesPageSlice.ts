import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FilesPageSchema } from '../types/filesPageSchema'

const initialState: FilesPageSchema = {
    isLoading: false,
    error: '',
    dirStack: [],
}

export const filesPageSlice = createSlice({
    name: 'userFilesList',
    initialState,
    reducers: {
        pushToDirStack: (state, action: PayloadAction<string>) => {
            state.dirStack = [...state.dirStack, action.payload]
        },
        setDirStack: (state, action: PayloadAction<string[]>) => {
            state.dirStack = action.payload
        },
        sliceDirStackById: (state, action: PayloadAction<string>) => {
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

export const { actions: filesPageActions } = filesPageSlice
export const { reducer: filesPageReducer } = filesPageSlice
