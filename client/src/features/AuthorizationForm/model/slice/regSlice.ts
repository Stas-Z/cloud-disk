import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthType } from '../consts/authConsts'
import { authByEmail } from '../services/authByEmail/authByEmail'
import { regByEmail } from '../services/regByEmail/regByEmail'
import { AuthSchema } from '../types/AuthSchema'

export const initialState: AuthSchema = {
    isLoading: false,
    password: '',
    email: '',
    succes: '',
    error: '',
    view: AuthType.AUTH,
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
        setView: (state, action: PayloadAction<AuthType>) => {
            state.view = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(regByEmail.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(regByEmail.fulfilled, (state, action) => {
                state.isLoading = false
                state.succes = action.payload
            })
            .addCase(regByEmail.rejected, (state, action) => {
                state.isLoading = false
                state.succes = undefined
                state.error = action.payload
            })
            .addCase(authByEmail.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(authByEmail.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(authByEmail.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: regActions } = regSlice
export const { reducer: regReducer } = regSlice
