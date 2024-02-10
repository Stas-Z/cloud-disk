import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'

interface regByEmailProps {
    email: string
    password: string
}

export const regByEmail = createAsyncThunk<
    string,
    regByEmailProps,
    ThunkConfig<string>
>('registration/regByEmail', async (authData, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
        const response = await extra.api.post('api/auth/registration', authData)

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (e) {
        console.log(e)
        return rejectWithValue('error')
    }
})
