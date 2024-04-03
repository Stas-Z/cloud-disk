import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User, initAuthData } from '@/entities/User'

import { getProfileForm } from '../../selectors/getProfileData'
import { fetchProfileData } from '../fetchProfileData/fetchProfileData'

export const updateProfileData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('profile/updateProfileData', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkAPI

    const formData = getProfileForm(getState())

    try {
        const response = await extra.api.post<User>('user/profile', formData)

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
})
