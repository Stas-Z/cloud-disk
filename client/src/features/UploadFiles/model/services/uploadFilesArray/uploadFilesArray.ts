import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile, fetchFilesList } from '@/entities/File'
import { initAuthData } from '@/entities/User'

export interface uploadFilesArrayProps {
    files: File[]
    dirId: string
    updateList?: boolean
}

export const uploadFilesArrays = createAsyncThunk<
    MyFile,
    uploadFilesArrayProps,
    ThunkConfig<string>
>(
    'uploadFiles/uploadFilesArray',
    async ({ files, dirId, updateList = true }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI

        try {
            const formData = new FormData()
            files.forEach((file) => {
                formData.append('files', file)
            })

            if (dirId) {
                formData.append('parent', dirId)
            }
            const response = await extra.api.post<MyFile>(
                'files/uploadArray',
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded / progressEvent.total) *
                                    100,
                            )
                            console.log(`Upload progress: ${percentCompleted}%`)
                        }
                    },
                },
            )
            if (!response.data) {
                throw new Error()
            }

            if (updateList) {
                dispatch(fetchFilesList(dirId))
            }

            // Обновляем данные пользователя
            dispatch(initAuthData())

            return response.data
        } catch (e: any) {
            if (e.response && e.response.data.message) {
                return rejectWithValue(e.response.data.message)
            }
            return rejectWithValue(e.message)
        }
    },
)
