import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User, initAuthData } from '@/entities/User'

import { fetchProfileData } from '../fetchProfileData/fetchProfileData'

export const uploadAvatar = createAsyncThunk<User, File, ThunkConfig<string>>(
    'editableProfileCard/uploadAvatar',
    async (file, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI

        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await extra.api.post<User>('user/avatar', formData)

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
