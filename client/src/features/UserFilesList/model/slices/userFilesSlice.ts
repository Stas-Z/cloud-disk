import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'

import { MyFile } from '@/entities/File'

import { createFileDir } from '../services/createFileDir/createFileDir'
import { fetchFilesList } from '../services/fetchFilesList/fetchFilesList'
import { uploadFiles } from '../services/uploadFiles/uploadFiles'
import { UserFilesSchema } from '../types/userFilesSchema'

export const filesAdapter = createEntityAdapter<MyFile, string>({
    selectId: (file: MyFile) => file._id,
})

export const userFilesSlice = createSlice({
    name: 'userFiles',
    initialState: filesAdapter.getInitialState<UserFilesSchema>({
        isLoading: false,
        error: '',
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilesList.pending, (state, action) => {
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
            .addCase(createFileDir.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(createFileDir.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(createFileDir.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(uploadFiles.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(uploadFiles.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(uploadFiles.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: userFilesActions } = userFilesSlice
export const { reducer: userFilesReducer } = userFilesSlice
