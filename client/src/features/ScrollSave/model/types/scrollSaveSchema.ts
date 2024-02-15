// <Адрес страницы, позиция скролла>
export type ScrollSave = Record<string, number>

export interface ScrollSaveSchema {
  scroll: ScrollSave
}
