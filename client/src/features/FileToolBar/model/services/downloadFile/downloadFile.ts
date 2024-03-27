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
        const response = await extra.api.get<Blob>(
            `/files/download/?id=${file._id}`,
            {
                responseType: 'blob',
            },
        )

        const downloadUrl = window.URL.createObjectURL(response.data)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.target = '_blank'
        link.download = file.type === 'dir' ? `${file.name}.zip` : file.name
        document.body.appendChild(link)
        link.click()
        link.remove()

        if (!response.data) {
            throw new Error()
        }

        return 'The file was uploaded successfully'
    } catch (e: any) {
        if (e.response && e.response.data.message) {
            return rejectWithValue(e.response.data.message)
        }
        return rejectWithValue(e.message)
    }
})
