import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User, userActions } from '@/entities/User'

interface authByEmailProps {
    email: string
    password: string
}

export const authByEmail = createAsyncThunk<
    User,
    authByEmailProps,
    ThunkConfig<string>
>('login/authByEmail', async (authData, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI
    try {
        const response = await extra.api.post('user/login', authData)

        if (!response.data) {
            throw new Error()
        }
        dispatch(userActions.setUser(response.data))

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
