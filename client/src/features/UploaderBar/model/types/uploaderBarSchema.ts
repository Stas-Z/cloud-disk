import { MyFile } from '@/entities/File'

export interface UploaderBarSchema {
    error?: string
    isLoading?: boolean
    onSucces?: boolean
    uploadedFiles: MyFile[]
}
