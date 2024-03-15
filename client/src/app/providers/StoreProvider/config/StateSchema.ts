import { EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

import { BreadcrumbsSchema } from '@/entities/Breadcrumbs'
import { CounterSchema } from '@/entities/Counter'
import { FileSchema } from '@/entities/File'
import { UserSchema } from '@/entities/User'
import { AuthSchema } from '@/features/AuthorizationForm'
import { CreateNewDirSchema } from '@/features/CreateNewDir'
import { FileToolBarSchema } from '@/features/FileToolBar'
import { UploadFilesSchema } from '@/features/UploadFiles'

import { createReduxStore } from './store'

export interface AsyncReducers {
    authForm: AuthSchema
    createNewDir: CreateNewDirSchema
    uploadFiles: UploadFilesSchema
    toolbar: FileToolBarSchema
}

export interface StateSchema {
    counter: CounterSchema
    authForm: AuthSchema
    user: UserSchema
    file: FileSchema
    breadcrumbs: BreadcrumbsSchema
    createNewDir: CreateNewDirSchema
    uploadFiles: UploadFilesSchema
    toolbar: FileToolBarSchema
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
