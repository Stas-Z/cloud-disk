import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { fetchFilesList } from '@/entities/File'
import { initAuthData } from '@/entities/User'

interface deleteFileProps {
    fileId: string
    dirId: string
}

export const deleteFile = createAsyncThunk<
    string,
    deleteFileProps,
    ThunkConfig<string>
>('fileToolBar/deleteFile', async ({ fileId, dirId }, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI

    try {
        const formData = new FormData()
        formData.append('parent', dirId)

        // Отправляем запрос на удаление файла
        const response = await extra.api.delete(`/files/?id=${fileId}`)

        if (!response.data) {
            throw new Error('No data received from the server')
        }

        // Обновляем список файлов в директории после успешного удаления файла
        dispatch(fetchFilesList(dirId))

        // Обновляем данные пользователя
        dispatch(initAuthData())

        return response.data.message
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
