import { StateSchema } from '@/app/providers/StoreProvider'

export const getfileToolbarIsLoading = (state: StateSchema) =>
    state.toolbar?.isLoading || false

export const getfileToolbarIsDeleting = (state: StateSchema) =>
    state.toolbar?.isDeleting || false

export const getfileToolbarIsDownloading = (state: StateSchema) =>
    state.toolbar?.isDownloading || false
