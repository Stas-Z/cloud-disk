export type ImgFileType = 'png' | 'jpg' | 'tif'
export type VideoFileType = 'mp4' | 'avi' | 'mov'

export type FileType = 'dir' | ImgFileType | 'rar' | VideoFileType

export interface MyFile {
    _id: string
    name: string
    type?: FileType
    accessLink?: string
    size?: string
    path?: string
    user?: number
    parent?: number
    childs?: [number]
    date?: string
    isDirectory?: boolean
    progress?: number
}
