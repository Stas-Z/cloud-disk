import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile, fetchFilesList } from '@/entities/File'

interface deleteFileProps {
    file: MyFile
    dirId: string
}

export const deleteFile = createAsyncThunk<
    string,
    deleteFileProps,
    ThunkConfig<string>
>('fileToolBar/deleteFile', async ({ file, dirId }, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI

    try {
        const formData = new FormData()
        formData.append('parent', dirId)

        // Отправляем запрос на удаление файла
        const response = await extra.api.delete(`/files/?id=${file._id}`)

        if (!response.data) {
            throw new Error('No data received from the server')
        }

        // Обновляем список файлов в директории после успешного удаления файла
        dispatch(fetchFilesList(dirId))

        return response.data.message
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
