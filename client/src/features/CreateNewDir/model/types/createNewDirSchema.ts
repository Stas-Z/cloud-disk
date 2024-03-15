import { MyFile } from '@/entities/File'

export interface CreateNewDirSchema {
    error?: string
    onSucces?: boolean
    isLoading?: boolean
    newFile?: MyFile
}
