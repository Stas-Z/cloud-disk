import { memo, useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Close from '@/shared/assets/icons/close.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Icon } from '@/shared/ui/Icon'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './UploaderBar.module.scss'
import { getUploaderBarFiles } from '../../model/selectors/uploaderBarSelector'
import { uploaderBarActions } from '../../model/slices/uploaderBarSlice'
import { UploaderItem } from '../UploaderItem/UploaderItem'

interface UploaderProps {
    className?: string
}

export const UploaderBar = memo((props: UploaderProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const uploadedFiles = useSelector(getUploaderBarFiles)

    const [showBar, setShowBar] = useState(false)

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            setShowBar(true)
        }
    }, [uploadedFiles.length])

    const onCloseHandler = useCallback(() => {
        setShowBar(false)
        dispatch(uploaderBarActions.clearUploadedFiles())
    }, [dispatch])

    // Вычисляем общий прогресс загрузки всех файлов
    const totalProgress = uploadedFiles.reduce(
        (total, file) => total + (file.progress || 0),
        0,
    )
    // Вычисляем средний прогресс загрузки всех файлов
    const percentCompleted = Math.round(
        ((totalProgress / uploadedFiles.length) * 10) / 10,
    )

    const headerText =
        percentCompleted === 100
            ? t('All files uploaded')
            : t('Loading', { percentCompleted })

    if (!showBar) {
        return null
    }
    return (
        <div className={classNames(cls.uploader, {}, [className])}>
            <HStack className={cls.uploaderHeader} align="center">
                <div
                    className={cls.uploadedProgress}
                    style={{ width: `${percentCompleted}%` }}
                />
                <Text
                    title={headerText}
                    size="s"
                    variant="white"
                    className={cls.text}
                    bold
                />
                <HStack justify="end" className={cls.controls} max>
                    <Text text="Закрыть" size="s" variant="white" />
                    <HStack className={cls.close} justify="center">
                        <Icon
                            Svg={Close}
                            clickable
                            onClick={onCloseHandler}
                            width={16}
                            height={16}
                            className={cls.icon}
                            color="white"
                        />
                    </HStack>
                </HStack>
            </HStack>
            <div className={cls.uploaderList}>
                <VStack justify="between" max>
                    {uploadedFiles.map((file) => {
                        return <UploaderItem file={file} key={file._id} />
                    })}
                </VStack>
            </div>
        </div>
    )
})
