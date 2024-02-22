import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FileSchema } from '../types/fileSchema'

const initialState: FileSchema = {
    currentDir: null,
    fileName: '',
    dirStack: [],
    scroll: {},
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

        setLastDir: (
            state,
            action: PayloadAction<{ path: string; position: string }>,
        ) => {
            state.scroll[action.payload.path] = action.payload.position
        },

        deleteLastDir: (state) => {
            const keys = Object.keys(state.scroll)
            const lastKeyIndex = keys.length - 1
            if (lastKeyIndex >= 0) {
                const lastKey = keys[lastKeyIndex]
                const newScroll = { ...state.scroll }
                delete newScroll[lastKey]
                state.scroll = newScroll
            }
        },
    },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
