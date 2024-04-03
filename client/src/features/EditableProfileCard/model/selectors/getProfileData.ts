import { StateSchema } from '@/app/providers/StoreProvider'

export const getProfileData = (state: StateSchema) => state.profile?.data

export const getProfileForm = (state: StateSchema) => state.profile?.form

export const getProfileError = (state: StateSchema) => state.profile?.error

export const getProfileIsLoading = (state: StateSchema) =>
    state.profile?.isLoading

export const getProfileisEditing = (state: StateSchema) =>
    state.profile?.isEditing
