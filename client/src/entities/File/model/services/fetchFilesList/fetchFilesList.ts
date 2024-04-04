import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'

import { getCurrentDir } from '../../selectors/fileSelectors/fileSelectors'
import { FileSortFiled, MyFile } from '../../types/files'

interface FetchFilesListProps {
    replace?: boolean
    sort?: FileSortFiled
    search?: string
}

export const fetchFilesList = createAsyncThunk<
    MyFile[],
    FetchFilesListProps,
    ThunkConfig<string>
>('file/fetchFilesList', async (props, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI

    const currentDir = getCurrentDir(getState())

    const { search, sort } = props

    try {
        const response = await extra.api.get<MyFile[]>('files', {
            params: {
                ...(currentDir ? { parent: currentDir } : {}),
                sort,
                search,
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
