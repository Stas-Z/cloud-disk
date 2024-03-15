import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'

import { deleteLastDirScroll } from '../services/deleteLastDirScroll/deleteLastDirScroll'
import { fetchFilesList } from '../services/fetchFilesList/fetchFilesList'
import { MyFile } from '../types/files'
import { FileSchema, ScrollSave } from '../types/fileSchema'

export const filesAdapter = createEntityAdapter<MyFile, string>({
    selectId: (file: MyFile) => file._id,
})

export const fileSlice = createSlice({
    name: 'file',
    initialState: filesAdapter.getInitialState<FileSchema>({
        currentDir: null,
        fileName: '',
        dirStack: [],
        scroll: {},
        selectedFile: { _id: '', name: '' },
        isLoading: false,
        error: '',
        ids: [],
        entities: {},
    }),

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
        setSelectedFile: (state, action: PayloadAction<MyFile>) => {
            state.selectedFile = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilesList.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                fetchFilesList.fulfilled,
                (state, action: PayloadAction<MyFile[]>) => {
                    state.isLoading = false
                    filesAdapter.setAll(state, action.payload)
                },
            )
            .addCase(fetchFilesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(deleteLastDirScroll.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                deleteLastDirScroll.fulfilled,
                (state, action: PayloadAction<ScrollSave>) => {
                    state.isLoading = false
                    state.scroll = action.payload
                },
            )
            .addCase(deleteLastDirScroll.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
