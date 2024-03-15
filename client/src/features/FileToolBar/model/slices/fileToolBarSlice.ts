import { createSlice } from '@reduxjs/toolkit'

import { deleteFile } from '../services/deleteFile/deleteFile'
import { downloadFile } from '../services/downloadFile/downloadFile'
import { FileToolBarSchema } from '../types/fileToolBarSchema'

const initialState: FileToolBarSchema = {
    isLoading: false,
    error: '',
    message: '',
}

export const fileToolBarSlice = createSlice({
    name: 'fileToolBar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteFile.pending, (state) => {
                state.error = undefined
                state.message = undefined
                state.isLoading = true
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.message = undefined
            })
            .addCase(downloadFile.pending, (state) => {
                state.error = undefined
                state.message = undefined
                state.isLoading = true
            })
            .addCase(downloadFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.message = action.payload
            })
            .addCase(downloadFile.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.message = undefined
            })
    },
})

export const { actions: fileToolBarActions } = fileToolBarSlice
export const { reducer: fileToolBarReducer } = fileToolBarSlice
