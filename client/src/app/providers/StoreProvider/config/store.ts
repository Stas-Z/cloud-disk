import { Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'

import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { authMiddleware } from '@/features/AuthorizationForm'
import { scrollSaveReducer } from '@/features/ScrollSave'
import { fileReducer } from '@/pages/FilesPage'
import { $api } from '@/shared/api/api'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

import { createReducerManager } from './reducerManager'
import { StateSchema, StateSchemaKey, ThunkExtraArg } from './StateSchema'

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducers: ReducersList = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        filesPage: fileReducer,
        scrollSave: scrollSaveReducer,
    }

    const reducerManager = createReducerManager(
        rootReducers as Record<StateSchemaKey, Reducer>,
    )

    const extraArg: ThunkExtraArg = {
        api: $api,
    }

    const store = configureStore({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }).concat(authMiddleware),
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}
