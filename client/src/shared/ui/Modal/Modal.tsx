import { ReactNode } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

import cls from './Modal.module.scss'
import { Overlay } from '../Overlay'
import { Portal } from '../Portal'

interface ModalProps {
    /**
     * @description additional class.
     */
    className?: string
    /**
     * @description Modal content
     */
    children?: ReactNode
    /**
     * @description Flag to show/hide modal
     */
    isOpen?: boolean
    /**
     * @description Callback to close modal
     */
    onClose?: () => void
    /**
     * @description Flag to render modal only when it is open
     */
    lazy?: boolean
    /**
     * @description Flag to show overlay
     */
    overlay?: boolean
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy,
        overlay = false,
    } = props

    const { close, isMounted } = useModal({
        animationDelay: 300,
        isOpen,
        onClose,
    })

    const mods: Mods = {
        [cls.opened]: isOpen,
    }

    if (lazy && !isMounted) {
        // проверяет если модалка в монтированна
        return null
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.modal, mods, [className])}>
                {overlay && <Overlay onClick={close} />}
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
}
