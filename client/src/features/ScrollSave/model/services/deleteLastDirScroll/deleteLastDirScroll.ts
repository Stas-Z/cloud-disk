import { createAsyncThunk } from '@reduxjs/toolkit'

import { StateSchema, ThunkConfig } from '@/app/providers/StoreProvider'

import { ScrollSave } from '../../types/scrollSaveSchema'

export const deleteLastDirScroll = createAsyncThunk<
    ScrollSave,
    void,
    ThunkConfig<string>
>('file/deleteLastDirScroll', async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const { scroll } = (getState() as StateSchema).scroll
        const scrollKeys = Object.keys(scroll)
        const lastKeyIndex = scrollKeys.length - 1
        if (lastKeyIndex >= 0) {
            const lastKey = scrollKeys[lastKeyIndex]
            const { [lastKey]: deleted, ...newScroll } = scroll

            return newScroll
        }
        return scroll
    } catch (e: any) {
        console.log(e)

        return rejectWithValue(e.message)
    }
})
