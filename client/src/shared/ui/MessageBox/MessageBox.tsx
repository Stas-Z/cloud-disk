import { memo, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './MessageBox.module.scss'
import { Portal } from '../Portal'
import { HStack, VStack } from '../Stack'
import { Text } from '../Text'

interface MessageBoxProps {
    className?: string
    isDeleting?: boolean
    isLoading?: boolean
    isUploading?: boolean
    isDownloading?: boolean
}

export const MessageBox = memo((props: MessageBoxProps) => {
    const {
        className,
        isDeleting = false,
        isLoading = false,
        isUploading = false,
        isDownloading = false,
    } = props
    const { t } = useTranslation()
    const isOpen = isDeleting || isLoading || isUploading || isDownloading

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        } else {
            setIsMounted(false)
        }
    }, [isOpen])

    if (!isMounted) return null

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <VStack
                align="center"
                max
                className={classNames(cls.messageBox, {}, [className])}
            >
                <HStack className={cls.msgContainer}>
                    <div className={cls.spinner} />

                    {isDeleting && (
                        <Text text={t('Deleting')} variant="white" />
                    )}
                    {isLoading && <Text text={t('Loading')} variant="white" />}
                    {isDownloading && (
                        <Text text={t('Downloading')} variant="white" />
                    )}
                    {isUploading && (
                        <Text text={t('Uploading')} variant="white" />
                    )}
                </HStack>
            </VStack>
        </Portal>
    )
})
