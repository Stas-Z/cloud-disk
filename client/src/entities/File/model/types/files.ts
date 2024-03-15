export type ImgFileType = 'png' | 'jpg' | 'tif'

export type FileType = 'dir' | ImgFileType | 'rar'

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
}

export interface MyFolder extends File {
    getAllEntries: () => Promise<File[]>
}
