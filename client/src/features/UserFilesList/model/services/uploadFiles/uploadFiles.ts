import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile } from '@/entities/File'
import { USER_TOKEN_KEY } from '@/shared/const/localstorage'

import { fetchFilesList } from '../fetchFilesList/fetchFilesList'

interface uploadFilesProps {
    file: File
    dirId: string
}

export const uploadFiles = createAsyncThunk<
    MyFile,
    uploadFilesProps,
    ThunkConfig<string>
>('userFilesList/uploadFiles', async ({ file, dirId }, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI

    try {
        const formData = new FormData()
        formData.append('file', file)
        if (dirId) {
            formData.append('parent', dirId)
        }
        const response = await extra.api.post<MyFile>(
            'files/upload',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`,
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100,
                        )
                        console.log(`Upload progress: ${percentCompleted}%`)
                    }
                },
            },
        )

        if (!response.data) {
            throw new Error()
        }

        dispatch(fetchFilesList(dirId))

        return response.data
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
