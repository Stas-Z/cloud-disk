import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile, FileType } from '@/entities/File'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

import { fetchFilesList } from '../fetchFilesList/fetchFilesList'

interface createFileDirProps {
    name: string
    parent: number
    type: FileType
}

export const createFileDir = createAsyncThunk<
    MyFile,
    createFileDirProps,
    ThunkConfig<string>
>('createDir/createFileDir', async ({ name, parent, type }, thunkAPI) => {
    const { extra, rejectWithValue, dispatch, getState } = thunkAPI
    try {
        const response = await extra.api.post<MyFile>(
            'files',
            { name, parent, type },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`,
                },
            },
        )

        if (!response.data) {
            throw new Error()
        }

        dispatch(fetchFilesList(parent))

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
