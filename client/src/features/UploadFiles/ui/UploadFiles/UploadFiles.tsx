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
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { MessageBox } from '@/shared/ui/MessageBox'
import { VStack } from '@/shared/ui/Stack'

import cls from './UploadFiles.module.scss'
import { fileUploadHelper } from '../../model/lib/helpers/fileUploadHelper/fileUploadHelper'
import {
    getUploadFilesError,
    getUploadFilesIsLoading,
    getUploadFilesOnSucces,
} from '../../model/selectors/uploadFilesSelectors'
import { uploadFilesReducer } from '../../model/slices/uploadFilesSlice'

interface UploadFilesProps {
    className?: string
    emptyPage?: boolean
}
const initialReducers: ReducersList = {
    uploadFiles: uploadFilesReducer,
}

export const UploadFiles = memo((props: UploadFilesProps) => {
    const { className, emptyPage } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const currentDir = useSelector(getCurrentDir)
    const error = useSelector(getUploadFilesError)
    const isUploading = useSelector(getUploadFilesIsLoading)

    const onSucces = useSelector(getUploadFilesOnSucces)

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
        },
        [addCancelToken, currentDir, dispatch, onResetInput],
    )

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack
                max
                className={classNames(cls.uploadFiles, {}, [className])}
            >
                <input
                    multiple
                    onChange={fileUploadHandler}
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    key={resetFileInput ? 'reset' : 'default'}
                />
                <Button
                    className={classNames(
                        cls.addButton,
                        { [cls.empty]: emptyPage },
                        [className],
                    )}
                    variant="filled"
                    color={emptyPage ? 'white' : 'yellow'}
                    fullWidth
                    shadow={!emptyPage}
                    onClick={openFilePicker}
                    addonLeft={<Icon Svg={Upload} className={cls.icon} />}
                >
                    {t('Upload file')}
                </Button>
            </VStack>

            <MessageBox isUploading={isUploading} />
        </DynamicModuleLoader>
    )
})
