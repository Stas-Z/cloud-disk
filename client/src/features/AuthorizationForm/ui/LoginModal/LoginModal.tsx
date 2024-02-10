import { Suspense } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card'
import { Modal } from '@/shared/ui/Modal'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
    const { className, isOpen, onClose } = props

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
            lazy
        >
            <Suspense fallback="">
                <Card>
                    <LoginFormAsync isOpen={isOpen} onSuccess={onClose} />
                </Card>
            </Suspense>
        </Modal>
    )
}
