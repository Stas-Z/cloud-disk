export type ImgFileType = 'png' | 'jpg' | 'tif' | 'JPG'
export type VideoFileType = 'mp4' | 'avi' | 'mov'

export type FileType = 'dir' | ImgFileType | 'rar' | VideoFileType

export type FileView = 'list' | 'grid' | 'big'

export type FileSortFiled = 'name' | 'type' | 'date' | 'size'

export interface MyFile {
    _id: string
    name: string
    type?: FileType
    accessLink?: string
    size?: number
    path?: string
    user?: number
    parent?: number
    childs?: [number]
    date?: string
    isDirectory?: boolean
    progress?: number
}
