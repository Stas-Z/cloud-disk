import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getScrollSave = (state: StateSchema) => state.scroll.scroll
export const getScrollSaveByDir = createSelector(
    getScrollSave,
    (state: StateSchema, pathDir: string) => pathDir,
    (scroll, pathDir) => scroll[pathDir] || '',
)
