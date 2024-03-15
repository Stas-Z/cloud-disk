import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile } from '@/entities/File'

export const downloadFile = createAsyncThunk<
    string,
    MyFile,
    ThunkConfig<string>
>('fileToolBar/downloadFile', async (file, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        if (file.type === 'dir') {
            const response = await extra.api.get<Blob>(
                `/files/download?id=${file._id}`,
                {
                    responseType: 'blob',
                },
            )

            if (response.status === 200) {
                const downloadUrl = window.URL.createObjectURL(response.data)
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = `${file.name}.zip`
                document.body.appendChild(link)
                link.click()
                link.remove()
                return downloadUrl
            }
            if (!response.data) {
                throw new Error()
            }
        }

        if (file.type !== 'dir') {
            const response = await extra.api.get<Blob>(
                `/files/download/?id=${file._id}`,
                {
                    responseType: 'blob',
                },
            )

            if (response.status === 200) {
                const downloadUrl = window.URL.createObjectURL(response.data)
                const link = document.createElement('a')
                link.href = downloadUrl
                link.download = file.name
                document.body.appendChild(link)
                link.click()
                link.remove()
                // Возвращаем URL для скачивания файла
                return downloadUrl
            }
            if (!response.data) {
                throw new Error()
            }
        }

        return rejectWithValue('Failed to download file')
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
