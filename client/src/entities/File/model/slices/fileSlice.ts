import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'

import { fetchFilesList } from '../services/fetchFilesList/fetchFilesList'
import { MyFile } from '../types/files'
import { FileSchema } from '../types/fileSchema'

export const filesAdapter = createEntityAdapter<MyFile, string>({
    selectId: (file: MyFile) => file._id,
})

export const fileSlice = createSlice({
    name: 'file',
    initialState: filesAdapter.getInitialState<FileSchema>({
        currentDir: null,
        dirName: '',
        dirNameNotice: '',

        selectedFile: { _id: '', name: '' },
        isLoading: false,
        error: '',
        ids: [],
        entities: {},
    }),

    reducers: {
        setDirName: (state, action: PayloadAction<string>) => {
            state.dirName = action.payload
        },
        setNoticeFileName: (state, action: PayloadAction<string>) => {
            state.dirNameNotice = action.payload
        },
        setCurrentDir: (state, action: PayloadAction<string | null>) => {
            state.currentDir = action.payload
        },

        setSelectedFile: (state, action: PayloadAction<MyFile>) => {
            state.selectedFile = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilesList.pending, (state, action) => {
                state.isLoading = true
                state.error = undefined
                if (action.meta.arg.replace) {
                    filesAdapter.removeAll(state)
                }
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
    },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
