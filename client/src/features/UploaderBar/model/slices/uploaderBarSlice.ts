import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MyFile } from '@/entities/File'

import { UploaderBarSchema } from '../types/uploaderBarSchema'

const initialState: UploaderBarSchema = {
    isLoading: false,
    onSucces: false,
    uploadedFiles: [],
}

export const uploaderBarSlice = createSlice({
    name: 'uploaderBar',
    initialState,
    reducers: {
        setUploadedFiles: (state, action: PayloadAction<MyFile>) => {
            state.uploadedFiles = [...state.uploadedFiles, action.payload]
        },
        setProgressFile: (state, action: PayloadAction<MyFile>) => {
            state.uploadedFiles = [
                ...state.uploadedFiles.map((uploadedFile) =>
                    uploadedFile.name === action.payload.name
                        ? {
                              ...uploadedFile,
                              progress: action.payload.progress,
                          }
                        : { ...uploadedFile },
                ),
            ]
        },
        cancelUploadedFiles: (state, action: PayloadAction<string>) => {
            state.uploadedFiles = [
                ...state.uploadedFiles.filter(
                    (file) => file._id !== action.payload,
                ),
            ]
        },
        clearUploadedFiles: (state) => {
            state.uploadedFiles = []
        },
    },
})

export const { actions: uploaderBarActions } = uploaderBarSlice
export const { reducer: uploaderBarReducer } = uploaderBarSlice
