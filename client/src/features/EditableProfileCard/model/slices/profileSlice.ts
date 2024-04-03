import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { User } from '@/entities/User'

import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'
import { ProfileCardSchema } from '../types/ProfileCardSchema'

const initialState: ProfileCardSchema = {
    isLoading: true,
    data: undefined,
    error: undefined,
    isEditing: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.form = state.data
            state.isEditing = false
        },
        updateProfile: (state, action: PayloadAction<User>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            }
            state.isEditing = true
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false
                    state.data = action.payload
                    state.form = action.payload
                    state.error = undefined
                    state.isEditing = false
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
