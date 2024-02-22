import { EntityState } from '@reduxjs/toolkit'

import { MyFile } from '@/entities/File'

export interface UserFilesSchema extends EntityState<MyFile, string> {
    error?: string
    isLoading?: boolean
}
