import { EntityState } from '@reduxjs/toolkit'

import { MyFile } from './files'

export interface FileSchema extends EntityState<MyFile, string> {
    dirName: string

    currentDir: string | null

    selectedFile?: MyFile
    isLoading?: boolean
    error?: string
}
