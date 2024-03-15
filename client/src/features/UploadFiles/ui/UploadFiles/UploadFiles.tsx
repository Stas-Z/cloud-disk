import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getCurrentDir } from '@/entities/File'
import { NoticePopup } from '@/entities/Notice'
import Upload from '@/shared/assets/icons/arrow-upload.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { VStack } from '@/shared/ui/Stack'

import cls from './UploadFiles.module.scss'
import {
    getUploadFilesError,
    getUploadFilesOnSucces,
    getUploadedFilesFileName,
} from '../../model/selectors/uploadFilesSelectors'
import { uploadFiles } from '../../model/services/uploadFiles/uploadFiles'
import { uploadFilesReducer } from '../../model/slices/uploadFilesSlice'

interface UploadFilesProps {
    className?: string
}
const initialReducers: ReducersList = {
    uploadFiles: uploadFilesReducer,
}

export const UploadFiles = memo((props: UploadFilesProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const currentDir = useSelector(getCurrentDir)
    const error = useSelector(getUploadFilesError)
    const uploadedFileName = useSelector(getUploadedFilesFileName)
    const onSucces = useSelector(getUploadFilesOnSucces)

    const openFilePicker = useCallback(() => {
        document.getElementById('fileInput')?.click()
    }, [])

    const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files) {
            const fileList: File[] = Array.from(files) // Преобразуем FileList в массив File
            fileList.forEach((file) => {
                dispatch(uploadFiles({ dirId: currentDir, file }))
            })
        }
    }

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
                />
                <Button
                    className={cls.addButton}
                    variant="filled"
                    color="yellow"
                    fullWidth
                    shadow
                    onClick={openFilePicker}
                    addonLeft={
                        <Icon
                            Svg={Upload}
                            height={16}
                            width={16}
                            className={cls.icon}
                        />
                    }
                >
                    {t('Upload file')}
                </Button>
            </VStack>
            {onSucces && (
                <NoticePopup
                    message={t('The file was uploaded successfully', {
                        file: uploadedFileName,
                    })}
                />
            )}
        </DynamicModuleLoader>
    )
})
