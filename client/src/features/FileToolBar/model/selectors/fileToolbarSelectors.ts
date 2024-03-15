import { StateSchema } from '@/app/providers/StoreProvider'

export const getfileToolbarIsLoading = (state: StateSchema) =>
    state.toolbar?.isLoading || false
export const getfileToolbarError = (state: StateSchema) =>
    state.toolbar?.error || ''
export const getfileToolbarMessage = (state: StateSchema) =>
    state.toolbar?.message || ''
