import { MyFile } from '@/entities/File'

export interface UploadFilesSchema {
    error?: string
    isLoading?: boolean
    onSucces?: boolean
    uploadedFile?: MyFile
}
