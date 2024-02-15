import { MyFile } from './files'

export interface FileSchema {
    files: MyFile[]
    currentDir?: string
}
