import { createAsyncThunk } from '@reduxjs/toolkit'

import { StateSchema, ThunkConfig } from '@/app/providers/StoreProvider'

import { ScrollSave } from '../types/fileSchema'

export const deleteLastDirSroll = createAsyncThunk<
    ScrollSave,
    void,
    ThunkConfig<string>
>('file/deleteLastDirSroll', async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const { scroll } = (getState() as StateSchema).file
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
