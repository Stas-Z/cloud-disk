import { StateSchema } from '@/app/providers/StoreProvider'

export const getFileFiltersView = (state: StateSchema) =>
    state.fileFilters.view || 'list'
export const getFileFiltersSort = (state: StateSchema) =>
    state.fileFilters.sort ?? 'type'
export const getFileFiltersSearch = (state: StateSchema) =>
    state.fileFilters.search ?? ''

export const getFileFiltersInited = (state: StateSchema) =>
    state.fileFilters?._inited
