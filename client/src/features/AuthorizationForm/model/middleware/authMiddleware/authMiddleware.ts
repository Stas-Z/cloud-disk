import { Dispatch, isAnyOf, isFulfilled } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'
import { userActions } from '@/entities/User'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

import { authByEmail } from '../../services/authByEmail/authByEmail'

interface Store {
    dispatch: Dispatch
    getState: () => StateSchema
}

const isLoggedIn = isFulfilled(authByEmail)
const isLoggedOut = isAnyOf(userActions.logout)

export const authMiddleware =
    (store: Store) =>
    (next: (action: unknown) => unknown) =>
    (action: unknown): void => {
        if (isLoggedIn(action)) {
            if (action.payload.token) {
                localStorage.setItem(USER_TOKEN_KEY, action.payload.token)
            }
        }

        if (isLoggedOut(action)) {
            localStorage.removeItem(USER_TOKEN_KEY)
        }

        next(action)
    }
