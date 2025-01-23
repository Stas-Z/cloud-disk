import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getCurrentDir } from '@/entities/File'
import Upload from '@/shared/assets/icons/arrow-upload.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCancelTokens } from '@/shared/lib/hooks/useCancelTokens/useCancelTokens'
import useResetInput from '@/shared/lib/hooks/useResetInput/useResetInput'
import { useDrawer } from '@/shared/ui/Drawer'
import { Icon } from '@/shared/ui/Icon'
import { MessageBox } from '@/shared/ui/MessageBox'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './UploadFilesMobile.module.scss'
import { fileUploadHelper } from '../../model/lib/helpers/fileUploadHelper/fileUploadHelper'
import { getUploadFilesIsLoading } from '../../model/selectors/uploadFilesSelectors'
import { uploadFilesReducer } from '../../model/slices/uploadFilesSlice'

interface UploadFilesMobileProps {
    className?: string
}
const initialReducers: ReducersList = {
    uploadFiles: uploadFilesReducer,
}

export const UploadFilesMobile = memo((props: UploadFilesMobileProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const closeDrawer = useDrawer()

    const currentDir = useSelector(getCurrentDir)

    const isUploading = useSelector(getUploadFilesIsLoading)

    const openFilePicker = useCallback(() => {
        document.getElementById('fileInput')?.click()
    }, [])

    const { addCancelToken } = useCancelTokens()
    const { resetFileInput, onResetInput } = useResetInput()

    const fileUploadHandler = useCallback(
        async (e: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target

            fileUploadHelper({
                files,
                currentDir,
                dispatch,
                addCancelToken,
            })
            // Сброс значения элемента <input type="file"> после загрузки файлов
            onResetInput()
            closeDrawer()
        },
        [addCancelToken, currentDir, dispatch, closeDrawer, onResetInput],
    )

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <HStack
                max
                className={classNames(cls.uploadFiles, {}, [className])}
                onClick={openFilePicker}
                gap="16"
                align="center"
            >
                <input
                    multiple
                    onChange={fileUploadHandler}
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    key={resetFileInput ? 'reset' : 'default'}
                />
                <HStack align="center" justify="center" className={cls.icon}>
                    <Icon Svg={Upload} width={16} height={16} />
                </HStack>
                <Text text={t('Upload files')} bold />
            </HStack>

            <MessageBox isUploading={isUploading} />
        </DynamicModuleLoader>
    )
})
