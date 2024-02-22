import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { BreadcrumbItem, BreadcrumbsSchema } from '../types/breadcrumbsSchema'

const initialState: BreadcrumbsSchema = {
    breadcrumbs: [],
}

export const breadcrumbsSlice = createSlice({
    name: 'breadcrumbs',
    initialState,
    reducers: {
        pushToStackBreadcrumbs: (
            state,
            action: PayloadAction<BreadcrumbItem>,
        ) => {
            state.breadcrumbs = [...state.breadcrumbs, action.payload]
        },
        setBreadcrumbs: (state, action: PayloadAction<BreadcrumbItem[]>) => {
            state.breadcrumbs = action.payload
        },
        sliceBreadcrumsById: (state, action: PayloadAction<string | null>) => {
            const breadcrumbsToDelete = state.breadcrumbs.findIndex(
                (breadcrumb) => breadcrumb.id === action.payload,
            )
            if (action.payload === null) {
                state.breadcrumbs = []
            }
            if (breadcrumbsToDelete !== -1) {
                state.breadcrumbs = [
                    ...state.breadcrumbs.slice(0, breadcrumbsToDelete + 1),
                ]
            }
        },
    },
})

export const { actions: breadcrumbsActions } = breadcrumbsSlice
export const { reducer: breadcrumbsReducer } = breadcrumbsSlice
