import { Suspense, memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { fileActions } from '@/entities/File'
import { getNoticeFileName } from '@/entities/Notice'
import Plus from '@/shared/assets/icons/plus.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { Modal } from '@/shared/ui/Modal'
import { VStack } from '@/shared/ui/Stack'

import cls from './CreateNewDirModal.module.scss'
import {
    getDirIsLoading,
    getFileError,
} from '../../model/selectors/CreateNewDirSelectors/CreateNewDirSelectors'
import { createNewDirReducer } from '../../model/slices/createNewDirSlice'
import { CreateNewDirFormAsync } from '../CreateNewDirForm/CreateNewDirForm.async'

interface CreateNewDirProps {
    className?: string
    onAccept?: (name: string, parent: string) => void
}

const initialReducers: ReducersList = {
    createNewDir: createNewDirReducer,
}

export const CreateNewDirModal = memo((props: CreateNewDirProps) => {
    const { className, onAccept } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const [showError, setShowError] = useState(false)
    const noticeFileName = useSelector(getNoticeFileName)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
        setShowError(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
        dispatch(fileActions.setDirName(t('New Folder')))
    }, [dispatch, t])

    const showErrorHandler = useCallback(() => {
        setShowError(true)
    }, [])

    const isLoading = useSelector(getDirIsLoading)
    const error = useSelector(getFileError)

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack
                max
                className={classNames(cls.createNewDir, {}, [className])}
            >
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
                            showError={showError}
                            showErrorHandler={showErrorHandler}
                            isLoading={isLoading}
                        />
                    </Suspense>
                </Modal>
            </VStack>
        </DynamicModuleLoader>
    )
})
