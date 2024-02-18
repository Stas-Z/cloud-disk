import { Suspense } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card'
import { Modal } from '@/shared/ui/Modal'

import { LoginFormAsync } from '../LoginForm/LoginForm.async'

interface LoginModalProps {
    className?: string
}

export const LoginModal = (props: LoginModalProps) => {
    const { className } = props

    return (
        <Modal
            className={classNames('', {}, [className])}
            isOpen
            lazy
            overlay={false}
        >
            <Suspense fallback="">
                <Card>
                    <LoginFormAsync />
                </Card>
            </Suspense>
        </Modal>
    )
}
