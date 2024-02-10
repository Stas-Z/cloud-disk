import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FileSchema } from '../types/fileSchema'

const initialState: FileSchema = {}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {},
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
})

export const { actions: fileActions } = fileSlice
export const { reducer: fileReducer } = fileSlice
