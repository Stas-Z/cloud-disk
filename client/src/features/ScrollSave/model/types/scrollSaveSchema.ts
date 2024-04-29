export type ScrollSave = Record<string, string>

export interface ScrollSaveSchema {
    isLoading?: boolean
    error?: string
    scroll: ScrollSave
}
