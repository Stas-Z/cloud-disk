import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { Canceler } from 'axios'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile, fetchFilesList } from '@/entities/File'
import { noticeActions } from '@/entities/Notice'
import { getUserDiskSpace, initAuthData } from '@/entities/User'
// eslint-disable-next-line fsd-pathcheker/layer-imports
import { uploadBarService, uploaderBarActions } from '@/features/UploaderBar'

export interface uploadFileProps {
    file: File
    dirId: string
    updateList?: boolean
    addCancelToken?: (fileId: string, cancel: Canceler) => void
}

export const uploadFile = createAsyncThunk<
    MyFile,
    uploadFileProps,
    ThunkConfig<string>
>(
    'uploadFiles/uploadFile',
    async ({ file, dirId, updateList = true, addCancelToken }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI

        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }

            const userSpace = getUserDiskSpace(getState())

            if (file.size > userSpace) {
                dispatch(noticeActions.setNoticeError('Not enough disk space'))
                return rejectWithValue('Not enough disk space')
            }

            const fileId = thunkAPI.requestId // уникальный id для файлов для UploadBar

            const { token, cancel } = axios.CancelToken.source() // создаём токен отмены и функцию отмены
            if (addCancelToken) {
                addCancelToken(fileId, cancel) // сохраняем в контекст функцию отмены и id файла
            }
            uploadBarService({ file, dispatch, fileId }) // Заполняем стейт для UploaderBar

            const response = await extra.api.post<MyFile>(
                'files/upload',
                formData,
                {
                    cancelToken: token, // токен отмены
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded / progressEvent.total) *
                                    100,
                            )
                            dispatch(
                                uploaderBarActions.setProgressFile({
                                    _id: Date.now().toString(),
                                    name: file.name,
                                    progress: percentCompleted,
                                }),
                            )
                        }
                    },
                },
            )
            if (!response.data) {
                throw new Error()
            }

            if (updateList) {
                dispatch(fetchFilesList({}))
            }

            // Обновляем данные пользователя
            dispatch(initAuthData())

            return response.data
        } catch (e: any) {
            if (e.response && e.response.data.message) {
                dispatch(noticeActions.setNoticeError(e.response.data.message))
                return rejectWithValue(e.response.data.message)
            }
            return rejectWithValue(e.message)
        }
    },
)
