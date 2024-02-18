import { EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

import { CounterSchema } from '@/entities/Counter'
import { FileSchema } from '@/entities/File'
import { UserSchema } from '@/entities/User'
import { AuthSchema } from '@/features/AuthorizationForm'
import { ScrollSaveSchema } from '@/features/ScrollSave'
import { UserFilesSchema } from '@/features/UserFilesList'

import { createReduxStore } from './store'

export interface AsyncReducers {
    authForm: AuthSchema
    userFiles: UserFilesSchema
}

export interface StateSchema {
    counter: CounterSchema
    user: UserSchema
    authForm: AuthSchema
    file: FileSchema
    userFiles: UserFilesSchema
    scrollSave: ScrollSaveSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>
    reduce: Reducer<StateSchema>
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance
}

export interface ThunkConfig<T> {
    rejectValue: T
    extra: ThunkExtraArg
    state: StateSchema
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
