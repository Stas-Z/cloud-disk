import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { Canceler } from 'axios'

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'

import { updateUsedSpace } from '../../../services/updateUsedSpace/updateUsedSpace'
import { uploadFile } from '../../../services/uploadFile/uploadFile'

interface FileUploadHelperProps {
    files: FileList | null
    dispatch: ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>
    currentDir: string
    addCancelToken?: (fileId: string, cancel: Canceler) => void
}

export const fileUploadHelper = async (props: FileUploadHelperProps) => {
    const { files, dispatch, currentDir, addCancelToken } = props
    if (files) {
        const fileList: File[] = Array.from(files)
        // Вычисляем общий размер файлов
        let totalSize = 0

        const uploadPromises = fileList.map(async (file) => {
            const result = await dispatch(
                uploadFile({
                    dirId: currentDir,
                    file,
                    addCancelToken,
                }),
            )
            if (result.meta.requestStatus === 'fulfilled') {
                totalSize += file.size
            }
        })

        try {
            // Дожидаемся завершения всех промисов загрузки файлов
            await Promise.all(uploadPromises)

            // Если все файлы успешно загружены, диспатчим action для обновления использованного места на диске пользователя
            await dispatch(updateUsedSpace({ fileSize: totalSize }))
        } catch (error) {
            console.error('Error uploading files:', error)
        }
    }
}
