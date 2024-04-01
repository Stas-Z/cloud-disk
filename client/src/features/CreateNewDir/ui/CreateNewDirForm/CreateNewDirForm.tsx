import { memo, useCallback, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getCurrentDir, fileActions, getFileName } from '@/entities/File'
import { noticeActions } from '@/entities/Notice'
import Close from '@/shared/assets/icons/close.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './CreateNewDirForm.module.scss'
import { createFileDir } from '../../model/services/createFileDir/createFileDir'

export interface CreateNewDirFormProps {
    className?: string
    isOpen?: boolean
    onSuccess: () => void
    onAccept?: (name: string, parent: string) => void
    isLoading?: boolean
    error?: string
    showError?: boolean
    showErrorHandler?: () => void
}

const CreateNewDirForm = (props: CreateNewDirFormProps) => {
    const {
        className,
        isOpen,
        onSuccess,
        isLoading,
        error,
        onAccept,
        showError,
        showErrorHandler,
    } = props
    const { t } = useTranslation()

    const dispatch = useAppDispatch()

    const currenDir = useSelector(getCurrentDir)

    const fileName = useSelector(getFileName)

    const onChangeFoldername = useCallback(
        (value: string) => {
            dispatch(fileActions.setDirName(value))
        },
        [dispatch],
    )

    const onSaveClick = useCallback(async () => {
        showErrorHandler?.()
        const result = await dispatch(
            createFileDir({
                name: fileName,
                parent: currenDir,
                type: 'dir',
            }),
        )

        dispatch(noticeActions.setNoticeFileName(fileName))

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess?.()
        }
    }, [currenDir, dispatch, fileName, onSuccess, showErrorHandler])

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onSaveClick()
            }
        },
        [onSaveClick],
    )
    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown, isOpen])

    return (
        <VStack
            className={classNames(cls.newDirForm, {}, [className])}
            justify="between"
        >
            <Text
                title={t('Enter the folder name')}
                size="s"
                bold
                className={cls.title}
            />
            <HStack className={cls.close}>
                <Icon Svg={Close} clickable onClick={onSuccess} />
            </HStack>
            <VStack gap="8" max>
                <HStack max className={cls.input}>
                    <Input
                        value={t(fileName)}
                        onChange={onChangeFoldername}
                        placeholder={t('New Folder')}
                        variant="outlined"
                        focus
                    />
                </HStack>
                <HStack max className={cls.error}>
                    {error && showError && (
                        <Text text={t(error)} variant="error" size="s" />
                    )}
                </HStack>
            </VStack>

            <HStack max justify="end">
                <Button
                    onClick={onSaveClick}
                    className={cls.loginBtn}
                    disabled={isLoading}
                    variant="filled"
                    color="yellow"
                    isLoading={isLoading}
                >
                    {t('Save')}
                </Button>
            </HStack>
        </VStack>
    )
}
export default memo(CreateNewDirForm)
