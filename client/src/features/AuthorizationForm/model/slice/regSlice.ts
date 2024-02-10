import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { regByEmail } from '../services/regByEmail/regByEmail'
import { AuthSchema } from '../types/AuthSchema'

export const initialState: AuthSchema = {
    isLoading: false,
    password: '',
    email: '',
    succes: false,
}

export const regSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(regByEmail.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(regByEmail.fulfilled, (state) => {
                state.isLoading = false
                state.succes = true
            })
            .addCase(regByEmail.rejected, (state, action) => {
                state.isLoading = false
                state.succes = false
                state.error = action.payload
            })
    },
})

export const { actions: regActions } = regSlice
export const { reducer: regReducer } = regSlice
