import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { MyFile } from '@/entities/File'

import { createFileDir } from '../services/createFileDir/createFileDir'
import { CreateNewDirSchema } from '../types/createNewDirSchema'

const initialState: CreateNewDirSchema = {
    isLoading: false,
    onSucces: false,
    error: '',
    newFile: { _id: '', name: '' },
}

export const createNewDirSlice = createSlice({
    name: 'createNewDir',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createFileDir.pending, (state) => {
                state.isLoading = true
                state.error = undefined
                state.onSucces = false
            })
            .addCase(
                createFileDir.fulfilled,
                (state, action: PayloadAction<MyFile>) => {
                    state.isLoading = false
                    state.onSucces = true
                    state.newFile = action.payload
                },
            )
            .addCase(createFileDir.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
                state.onSucces = false
            })
    },
})

export const { actions: createNewDirActions } = createNewDirSlice
export const { reducer: createNewDirReducer } = createNewDirSlice
