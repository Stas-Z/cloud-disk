import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile } from '@/entities/File'

export const downloadFolder = createAsyncThunk<
    void,
    MyFile,
    ThunkConfig<string>
>('fileToolBar/downloadFolder', async (folder, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI

    try {
        const response = await extra.api.get<Blob>(
            `/files/downloadFolder?id=${folder._id}`,
            {
                responseType: 'blob',
            },
        )

        if (response.status === 200) {
            const downloadUrl = window.URL.createObjectURL(response.data)
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = `${folder.name}.zip`
            document.body.appendChild(link)
            link.click()
            link.remove()
        }

        if (!response.data) {
            throw new Error()
        }

        return rejectWithValue('Failed to download file')
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message)
        }
        return rejectWithValue('Failed to download folder')
    }
})
