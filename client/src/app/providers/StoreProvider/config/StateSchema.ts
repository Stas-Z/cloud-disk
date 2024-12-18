import { EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'

import { BreadcrumbsSchema } from '@/entities/Breadcrumbs'
import { CounterSchema } from '@/entities/Counter'
import { FileSchema } from '@/entities/File'
import { NoticeSchema } from '@/entities/Notice'
import { UserSchema } from '@/entities/User'
import { AuthSchema } from '@/features/AuthorizationForm'
import { CreateNewDirSchema } from '@/features/CreateNewDir'
import { ProfileCardSchema } from '@/features/EditableProfileCard'
import { FileToolBarSchema } from '@/features/FileToolBar'
import { ScrollSaveSchema } from '@/features/ScrollSave'
import { UploaderBarSchema } from '@/features/UploaderBar'
import { UploadFilesSchema } from '@/features/UploadFiles'
import { UserFilesFiltersSchema } from '@/features/UserFilesFilters'
import { FilesPageSchema } from '@/pages/FilesPage'

import { createReduxStore } from './store'

export interface AsyncReducers {
    authForm: AuthSchema
    createNewDir: CreateNewDirSchema
    uploadFiles: UploadFilesSchema
    toolbar: FileToolBarSchema
    profile: ProfileCardSchema
}

export interface StateSchema {
    counter: CounterSchema
    authForm: AuthSchema
    user: UserSchema
    file: FileSchema
    notice: NoticeSchema
    filePage: FilesPageSchema
    scroll: ScrollSaveSchema
    fileFilters: UserFilesFiltersSchema
    breadcrumbs: BreadcrumbsSchema
    createNewDir: CreateNewDirSchema
    uploadFiles: UploadFilesSchema
    toolbar: FileToolBarSchema
    uploaderBar: UploaderBarSchema
    profile: ProfileCardSchema
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
