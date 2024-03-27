import { EntityState } from '@reduxjs/toolkit'

import { MyFile } from './files'

export type ScrollSave = Record<string, string>

export interface FileSchema extends EntityState<MyFile, string> {
    dirName: string
    dirNameNotice?: string
    currentDir: string | null
    dirStack: string[]
    scroll: ScrollSave
    selectedFile?: MyFile
    isLoading?: boolean
    error?: string
}
