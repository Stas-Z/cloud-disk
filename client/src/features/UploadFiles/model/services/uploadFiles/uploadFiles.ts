import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile, fetchFilesList } from '@/entities/File'

export interface uploadFilesProps {
    file: File
    dirId: string
    updateList?: boolean
}

export const uploadFiles = createAsyncThunk<
    MyFile,
    uploadFilesProps,
    ThunkConfig<string>
>(
    'uploadFiles/uploadFiles',
    async ({ file, dirId, updateList = true }, thunkAPI) => {
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

            return response.data
        } catch (e: any) {
            if (e.response && e.response.data.message) {
                return rejectWithValue(e.response.data.message)
            }
            return rejectWithValue(e.message)
        }
    },
)
