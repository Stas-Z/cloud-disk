import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile } from '@/entities/File'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

export const fetchFilesList = createAsyncThunk<
    MyFile[],
    string | null,
    ThunkConfig<string>
>('userFilesList/fetchFilesList', async (currentDir, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI
    try {
        const response = await extra.api.get<MyFile[]>('files', {
            params: {
                ...(currentDir ? { parent: currentDir } : {}),
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`,
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
