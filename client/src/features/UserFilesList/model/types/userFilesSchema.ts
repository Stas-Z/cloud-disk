import { EntityState } from '@reduxjs/toolkit'

import { MyFile } from '@/entities/File'

export interface UserFilesSchema extends EntityState<MyFile, number> {
    error?: string
    isLoading?: boolean
}
