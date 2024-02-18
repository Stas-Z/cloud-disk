export interface FileSchema {
    fileName: string
    currentDir: number | null
    dirStack: number[]
    currentFileName: string
}
