import { createAsyncThunk } from '@reduxjs/toolkit'

import { StateSchema, ThunkConfig } from '@/app/providers/StoreProvider'

import { ScrollSave } from '../../types/scrollSaveSchema'

export const deleteDirScroll = createAsyncThunk<
    ScrollSave,
    string,
    ThunkConfig<string>
>('scroll/deleteDirScroll', async (keyToDelete, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI
    try {
        const { scroll } = (getState() as StateSchema).scroll

        const keysToDelete = Object.keys(scroll).filter(
            (key) => key > keyToDelete,
        )
        const newScroll = { ...scroll }
        keysToDelete.forEach((key) => delete newScroll[key])
        return newScroll
    } catch (e: any) {
        console.log(e)

        return rejectWithValue(e.message)
    }
})
