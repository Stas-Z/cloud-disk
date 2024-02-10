import { StateSchema } from '@/app/providers/StoreProvider'

import { initialState } from '../../slice/regSlice'

export const getLoginState = (state: StateSchema) =>
    state?.authForm || initialState
