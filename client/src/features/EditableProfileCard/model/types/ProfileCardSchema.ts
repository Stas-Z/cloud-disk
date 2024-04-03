import { User } from '@/entities/User'

export interface ProfileCardSchema {
    data?: User
    form?: User
    isLoading: boolean
    error?: string
    isEditing?: boolean
}
