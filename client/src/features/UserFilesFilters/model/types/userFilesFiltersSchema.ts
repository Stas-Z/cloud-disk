import { FileSortFiled, FileView } from '@/entities/File'

export interface UserFilesFiltersSchema {
    error?: string
    isLoading?: boolean

    // filters
    view: FileView
    sort: FileSortFiled
    search: string

    _inited: boolean
}
