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
>('registration/regByEmail', async (regData, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
        const response = await extra.api.post('user/registration', regData)

        if (!response.data) {
            throw new Error()
        }

        return response.data.message
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
