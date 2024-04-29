import { Suspense, memo } from 'react'

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
    showErrorHandler?: () => void
    showError?: boolean
}

export const CreateNewDirModal = memo((props: CreateNewDirProps) => {
    const { className, isOpen, onClose, showErrorHandler, showError } = props

    const isLoading = useSelector(getDirIsLoading)
    const error = useSelector(getFileError)

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
            overlay
        >
            <Suspense fallback="">
                <CreateNewDirFormAsync
                    error={error}
                    onSuccess={onClose}
                    showError={showError}
                    showErrorHandler={showErrorHandler}
                    isLoading={isLoading}
                />
            </Suspense>
        </Modal>
    )
})
