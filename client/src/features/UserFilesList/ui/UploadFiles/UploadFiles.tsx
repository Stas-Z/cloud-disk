import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getCurrentDir } from '@/entities/File'
import Upload from '@/shared/assets/icons/arrow-upload.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { VStack } from '@/shared/ui/Stack'

import cls from './UploadFiles.module.scss'
import { getFileError } from '../../model/selectors/userFilesListSelectors/userFilesListSelectors'
import { uploadFiles } from '../../model/services/uploadFiles/uploadFiles'

interface UploadFilesProps {
    className?: string
}

export const UploadFiles = memo((props: UploadFilesProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const currentDir = useSelector(getCurrentDir)
    const error = useSelector(getFileError)
    console.log(error)

    const openFilePicker = useCallback(() => {
        document.getElementById('fileInput')?.click()
    }, [])

    const fileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files) {
            const fileList: File[] = Array.from(files) // Преобразуем FileList в массив File
            fileList.forEach((file) =>
                dispatch(uploadFiles({ dirId: currentDir, file })),
            )
        }
    }

    return (
        <VStack max className={classNames(cls.uploadFiles, {}, [className])}>
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
    )
})
