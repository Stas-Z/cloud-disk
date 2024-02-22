export type FileType = 'dir' | 'file'

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
}
