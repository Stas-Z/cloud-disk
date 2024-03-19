import { Suspense } from 'react'

import { LangSwitcher } from '@/features/LangSwitcher'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card'
import { Modal } from '@/shared/ui/Modal'

import cls from './LoginModal.module.scss'
import { LoginFormAsync } from '../../../../features/AuthorizationForm/ui/LoginForm/LoginForm.async'

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
                    <div className={cls.switchers}>
                        <LangSwitcher variant="filled" />
                    </div>
                    <LoginFormAsync />
                </Card>
            </Suspense>
        </Modal>
    )
}
