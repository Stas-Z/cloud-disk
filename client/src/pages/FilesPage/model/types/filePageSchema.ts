import { EntityState } from '@reduxjs/toolkit'

import { MyFile } from '@/entities/File'

export interface filePageSchema extends EntityState<MyFile, number> {
    isLoading?: boolean
    error?: string
    currentDir?: string
}
