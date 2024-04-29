import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { deleteDirScroll } from '../services/deleteDirScroll/deleteDirScroll'
import { deleteLastDirScroll } from '../services/deleteLastDirScroll/deleteLastDirScroll'
import { ScrollSave, ScrollSaveSchema } from '../types/scrollSaveSchema'

const initialState: ScrollSaveSchema = {
    isLoading: false,
    error: '',
    scroll: {},
}

export const scrollSaveSlice = createSlice({
    name: 'scrollSave',
    initialState,
    reducers: {
        setLastDirScroll: (
            state,
            action: PayloadAction<{ path: string; position: string }>,
        ) => {
            state.scroll[action.payload.path] = action.payload.position
        },
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(deleteDirScroll.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                deleteDirScroll.fulfilled,
                (state, action: PayloadAction<ScrollSave>) => {
                    state.isLoading = false
                    state.scroll = action.payload
                },
            )
            .addCase(deleteDirScroll.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: scrollSaveActions } = scrollSaveSlice
export const { reducer: scrollSaveReducer } = scrollSaveSlice
