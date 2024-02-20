import { Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'

import { breadcrumbsReducer } from '@/entities/Breadcrumbs'
import { counterReducer } from '@/entities/Counter'
import { fileReducer } from '@/entities/File'
import { userReducer } from '@/entities/User'
import { authMiddleware } from '@/features/AuthorizationForm'
import { scrollSaveReducer } from '@/features/ScrollSave'
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
        file: fileReducer,
        scrollSave: scrollSaveReducer,
        breadcrumbs: breadcrumbsReducer,
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
