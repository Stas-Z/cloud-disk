import { createSlice } from '@reduxjs/toolkit'

import { uploadFiles } from '../services/uploadFiles/uploadFiles'
import { UploadFilesSchema } from '../types/uploadFilesSchema'

const initialState: UploadFilesSchema = {
    isLoading: false,
    onSucces: false,
    error: '',
    uploadedFile: { name: '', _id: '' },
}

export const uploadFilesSlice = createSlice({
    name: 'uploadFiles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadFiles.pending, (state) => {
                state.isLoading = true
                state.onSucces = false
                state.error = undefined
            })
            .addCase(uploadFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.onSucces = true
                state.uploadedFile = action.payload
            })
            .addCase(uploadFiles.rejected, (state, action) => {
                state.isLoading = false
                state.onSucces = false
                state.error = action.payload
            })
    },
})

export const { actions: uploadFilesActions } = uploadFilesSlice
export const { reducer: uploadFilesReducer } = uploadFilesSlice
