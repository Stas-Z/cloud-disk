import { createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line fsd-pathcheker/layer-imports

import { uploadFile } from '../services/uploadFile/uploadFile'
import { uploadFilesArrays } from '../services/uploadFilesArray/uploadFilesArray'
import { UploadFilesSchema } from '../types/uploadFilesSchema'

const initialState: UploadFilesSchema = {
    isLoading: false,
    onSucces: false,
    error: '',
}

export const uploadFilesSlice = createSlice({
    name: 'uploadFiles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.onSucces = true
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
            .addCase(uploadFilesArrays.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(uploadFilesArrays.fulfilled, (state) => {
                state.isLoading = false
                state.onSucces = true
            })
            .addCase(uploadFilesArrays.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
    },
})

export const { actions: uploadFilesActions } = uploadFilesSlice
export const { reducer: uploadFilesReducer } = uploadFilesSlice
