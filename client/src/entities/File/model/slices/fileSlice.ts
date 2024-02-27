import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { deleteLastDirSroll } from '../services/deleteLastDirSroll'
import { FileSchema, ScrollSave } from '../types/fileSchema'

const initialState: FileSchema = {
    currentDir: null,
    fileName: '',
    dirStack: [],
    scroll: {},
    isLoading: false,
    error: '',
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFileName: (state, action: PayloadAction<string>) => {
            state.fileName = action.payload
        },
        setCurrentDir: (state, action: PayloadAction<string | null>) => {
            state.currentDir = action.payload
        },

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

        setLastDirScroll: (
            state,
            action: PayloadAction<{ path: string; position: string }>,
        ) => {
            state.scroll[action.payload.path] = action.payload.position
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteLastDirSroll.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                deleteLastDirSroll.fulfilled,
                (state, action: PayloadAction<ScrollSave>) => {
                    state.isLoading = false
                    state.scroll = action.payload
                },
            )
            .addCase(deleteLastDirSroll.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
