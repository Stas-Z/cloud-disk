import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'

import { MyFile } from '../../types/files'

export const fetchFilesList = createAsyncThunk<
    MyFile[],
    string | null,
    ThunkConfig<string>
>('file/fetchFilesList', async (currentDir, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
        const response = await extra.api.get<MyFile[]>('files', {
            params: {
                ...(currentDir ? { parent: currentDir } : {}),
            },
        })

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
