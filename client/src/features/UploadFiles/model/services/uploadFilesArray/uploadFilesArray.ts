import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { Canceler } from 'axios'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile } from '@/entities/File'
import { noticeActions } from '@/entities/Notice'
import { getUserDiskSpace, initAuthData } from '@/entities/User'
// eslint-disable-next-line fsd-pathcheker/layer-imports
import { uploadBarService, uploaderBarActions } from '@/features/UploaderBar'

interface FileWithParent {
    file: File
    parentDir: string // Родительская папка
}

export interface uploadFilesArrayProps {
    files: FileWithParent[]
    dirId: string[]
    addCancelToken?: (fileId: string, cancel: Canceler) => void
    folderName: string
    folderId: string
}

export const uploadFilesArrays = createAsyncThunk<
    MyFile,
    uploadFilesArrayProps,
    ThunkConfig<string>
>(
    'uploadFiles/uploadFilesArray',
    async (
        { files, dirId, addCancelToken, folderName, folderId },
        thunkAPI,
    ) => {
        const { extra, rejectWithValue, dispatch, getState } = thunkAPI

        try {
            const formData = new FormData()

            const userSpace = getUserDiskSpace(getState())

            const totalSize = files.reduce(
                (size, file) => size + file.file.size,
                0,
            )

            if (totalSize > userSpace) {
                dispatch(noticeActions.setNoticeError('Not enough disk space'))
                return rejectWithValue('Not enough disk space')
            }

            const filesByParentDir: { [parentDir: string]: File[] } = {} // Создаем объект для группировки файлов по родительским директориям

            files.forEach((file) => {
                const { parentDir } = file

                // Если родительская директория еще не добавлена в объект, добавляем ее
                if (!filesByParentDir[parentDir]) {
                    filesByParentDir[parentDir] = []
                }

                // Добавляем файл в массив файлов для соответствующей родительской директории
                filesByParentDir[parentDir].push(file.file)
            })

            // Теперь добавляем файлы в FormData, группируя их по родительским директориям
            Object.entries(filesByParentDir).forEach(([parentDir, files]) => {
                // Добавляем каждый файл в FormData
                files.forEach((file) => {
                    // Добавляем файл
                    formData.append(parentDir, file, file.name)
                })
            })

            // Добавляем id родителей в тело запроса
            dirId.forEach((id) => {
                formData.append('parent', id)
            })

            const fileId = folderId // уникальный id для папки для UploadBar

            const { token, cancel } = axios.CancelToken.source() // создаём токен отмены и функцию отмены
            if (addCancelToken) {
                addCancelToken(fileId, cancel) // сохраняем в контекст функцию отмены и id файла
            }

            const filesArray = {
                folderName,
                totalSize,
            }

            uploadBarService({ filesArray, dispatch, fileId }) // Заполняем стейт для UploaderBar

            const response = await extra.api.post<MyFile>(
                'files/uploadArray',
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
                                    name: folderName,
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
