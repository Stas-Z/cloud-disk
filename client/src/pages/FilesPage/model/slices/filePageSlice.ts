import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit'

import { MyFile } from '@/entities/File'

import { fetchFilesList } from '../services/fetchFilesList/fetchFilesList'
import { filePageSchema } from '../types/filePageSchema'

export const filesAdapter = createEntityAdapter<MyFile, number>({
    selectId: (file: MyFile) => file._id,
})

export const filePageSlice = createSlice({
    name: 'file',
    initialState: filesAdapter.getInitialState<filePageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        currentDir: '',
    }),
    reducers: {
        setCurrentDir: (state, action: PayloadAction<string>) => {
            state.currentDir = action.payload
        },
    },
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
    },
})

export const { actions: fileActions } = filePageSlice
export const { reducer: fileReducer } = filePageSlice
