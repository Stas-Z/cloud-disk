import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import {
    userFilesFiltersActions,
    getFileFiltersInited,
} from '@/features/UserFilesFilters'

export const initFilesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'filesPage/initFilesPage',
    async (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI

        const inited = getFileFiltersInited(getState())

        if (!inited) {
            dispatch(userFilesFiltersActions.initState())
        }
    },
)
