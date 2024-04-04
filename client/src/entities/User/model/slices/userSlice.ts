import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { USER_FIRST_VISIT_KEY } from '@/shared/const/localstorage'

import { User, UserSchema } from '../types/userSchema'

const initialState: UserSchema = {
    isAuth: false,
    firstVisit: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            state.isAuth = true
            if (
                state.currentUser.id ===
                localStorage.getItem(USER_FIRST_VISIT_KEY)
            ) {
                state.firstVisit = true
            }
        },
        setUserVisit: (state, action) => {
            state.firstVisit = true
            localStorage.setItem(USER_FIRST_VISIT_KEY, action.payload)
        },
        logout: (state) => {
            state.isAuth = false
        },
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
