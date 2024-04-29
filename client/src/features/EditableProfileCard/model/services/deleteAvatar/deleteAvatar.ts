import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User, initAuthData } from '@/entities/User'

import { fetchProfileData } from '../fetchProfileData/fetchProfileData'

export const deleteAvatar = createAsyncThunk<User, void, ThunkConfig<string>>(
    'profile/deleteAvatar',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI

        try {
            const response = await extra.api.delete<User>('user/avatar')

            if (!response.data) {
                throw new Error()
            }

            // Обновляем данные пользователя
            dispatch(initAuthData())

            // Обновляем данные профиля
            dispatch(fetchProfileData())

            return response.data
        } catch (e: any) {
            if (e.response && e.response.data.message) {
                return rejectWithValue(e.response.data.message)
            }
            return rejectWithValue(e.message)
        }
    },
)
