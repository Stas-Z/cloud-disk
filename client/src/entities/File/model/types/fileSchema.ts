export type ScrollSave = Record<string, string>

export interface FileSchema {
    fileName: string
    currentDir: string | null
    dirStack: string[]
    scroll: ScrollSave
}
