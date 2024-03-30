import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { FileSortFiled, FileView } from '@/entities/File'
import { FILE_VIEW_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'

import { UserFilesFiltersSchema } from '../types/userFilesFiltersSchema'

const initialState: UserFilesFiltersSchema = {
    isLoading: false,
    error: '',
    view: 'grid',
    sort: 'name',
    search: '',
    _inited: false,
}

export const userFilesFiltersSlice = createSlice({
    name: 'userFilesFilters',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<FileView>) => {
            state.view = action.payload
            localStorage.setItem(FILE_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setSort: (state, action: PayloadAction<FileSortFiled>) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        initState: (state) => {
            const view = localStorage.getItem(
                FILE_VIEW_LOCALSTORAGE_KEY,
            ) as FileView
            state.view = view
            state._inited = true
        },
    },
})

export const { actions: userFilesFiltersActions } = userFilesFiltersSlice
export const { reducer: userFilesFiltersReducer } = userFilesFiltersSlice
