import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { initAuthData } from '@/entities/User'

export interface UpdateUsedSpaceProps {
    fileSize: number
}

export const updateUsedSpace = createAsyncThunk<
    void,
    UpdateUsedSpaceProps,
    ThunkConfig<string>
>('user/updateUsedSpace', async ({ fileSize }, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI

    try {
        const response = await extra.api.patch<void>('user/userSpace', {
            usedSpace: fileSize,
        })

        if (response.status !== 200) {
            throw new Error('Failed to update used space')
        }

        // Обновляем данные пользователя
        dispatch(initAuthData())

        return response.data
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        }
        return rejectWithValue(error.message)
    }
})
