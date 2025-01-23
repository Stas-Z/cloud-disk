import { Suspense, memo, useCallback, useState } from 'react'

import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Modal } from '@/shared/ui/Modal'

import {
    getDirIsLoading,
    getFileError,
} from '../../model/selectors/CreateNewDirSelectors/CreateNewDirSelectors'
import { CreateNewDirFormAsync } from '../CreateNewDirForm/CreateNewDirForm.async'

interface CreateNewDirProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const CreateNewDirModal = memo((props: CreateNewDirProps) => {
    const { className, isOpen, onClose } = props

    const [showError, setShowError] = useState(false)
    const showErrorHandler = useCallback(() => {
        setShowError(true)
    }, [])

    const isLoading = useSelector(getDirIsLoading)
    const error = useSelector(getFileError)

    const onCloseModal = useCallback(() => {
        onClose()
        setShowError(false)
    }, [onClose])

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
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
    )
})
