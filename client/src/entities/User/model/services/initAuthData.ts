import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

import { userActions } from '../slices/userSlice'
import { User } from '../types/userSchema'

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI
        try {
            const response = await extra.api.get<User>('auth/auth', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`,
                },
            })

            if (!response.data) {
                throw new Error()
            }
            dispatch(userActions.setUser(response.data))

            return response.data
        } catch (e) {
            localStorage.removeItem(USER_TOKEN_KEY)
            console.log(e)
            return rejectWithValue('error')
        }
    },
)
