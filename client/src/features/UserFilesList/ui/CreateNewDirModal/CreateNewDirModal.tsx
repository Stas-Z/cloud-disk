import { Suspense, memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { fileActions } from '@/entities/File'
import Plus from '@/shared/assets/icons/plus.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Modal } from '@/shared/ui/Modal'
import { VStack } from '@/shared/ui/Stack'

import cls from './CreateNewDirModal.module.scss'
import {
    getFileError,
    getFileIsLoading,
} from '../../model/selectors/userFilesListSelectors/userFilesListSelectors'
import { CreateNewDirFormAsync } from '../CreateNewDirForm/CreateNewDirForm.async'

interface CreateNewDirProps {
    className?: string
    onAccept?: (name: string, parent: string) => void
}

export const CreateNewDirModal = memo((props: CreateNewDirProps) => {
    const { className, onAccept } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const [showError, setShowError] = useState(false)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
        setShowError(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
        dispatch(fileActions.setFileName(t('New Folder')))
    }, [dispatch, t])

    const showErrorHandler = useCallback(() => {
        setShowError(true)
    }, [])

    const isLoading = useSelector(getFileIsLoading)
    const error = useSelector(getFileError)

    return (
        <VStack max className={classNames(cls.createNewDir, {}, [className])}>
            <Button
                className={cls.addButton}
                onClick={onShowModal}
                variant="filled"
                color="white"
                fullWidth
                shadow
                addonLeft={
                    <Icon
                        Svg={Plus}
                        height={24}
                        width={24}
                        className={cls.icon}
                    />
                }
            >
                {t('Create folder')}
            </Button>
            <Modal
                className={classNames(cls.newDirModal, {}, [className])}
                isOpen={isAuthModal}
                onClose={onCloseModal}
                lazy
                overlay
            >
                <Suspense fallback="">
                    <CreateNewDirFormAsync
                        error={error}
                        onSuccess={onCloseModal}
                        onAccept={onAccept}
                        showError={showError}
                        showErrorHandler={showErrorHandler}
                    />
                </Suspense>
            </Modal>
        </VStack>
    )
})
