import { Suspense, memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { fileActions } from '@/entities/File'
import FoldrePlus from '@/shared/assets/icons/folder-plus.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useDrawer } from '@/shared/ui/Drawer'
import { Icon } from '@/shared/ui/Icon'
import { Modal } from '@/shared/ui/Modal'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './CreateNewDirModalMobile.module.scss'
import {
    getDirIsLoading,
    getFileError,
} from '../../model/selectors/CreateNewDirSelectors/CreateNewDirSelectors'
import { CreateNewDirFormAsync } from '../CreateNewDirForm/CreateNewDirForm.async'

interface CreateNewDirProps {
    className?: string
}

export const CreateNewDirModalMobile = memo((props: CreateNewDirProps) => {
    const { className } = props
    const { t } = useTranslation()

    const closeDrawer = useDrawer()

    const dispatch = useAppDispatch()

    const [showError, setShowError] = useState(false)
    const showErrorHandler = useCallback(() => {
        setShowError(true)
    }, [])

    const isLoading = useSelector(getDirIsLoading)
    const error = useSelector(getFileError)

    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = useCallback(() => {
        closeDrawer()
        setIsAuthModal(false)
        setShowError(false)
    }, [closeDrawer])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
        dispatch(fileActions.setDirName(t('New Folder')))
    }, [dispatch, t])

    return (
        <HStack
            onClick={onShowModal}
            className={classNames(cls.createDir, {}, [className])}
            gap="16"
        >
            <Icon Svg={FoldrePlus} width={40} height={40} />
            <Text text={t('New folder')} bold />
            <Modal isOpen={isAuthModal} onClose={onCloseModal} lazy overlay>
                <Suspense fallback="">
                    <CreateNewDirFormAsync
                        error={error}
                        onSuccess={onCloseModal}
                        showError={showError}
                        showErrorHandler={showErrorHandler}
                        isLoading={isLoading}
                    />
                </Suspense>
            </Modal>
        </HStack>
    )
})
