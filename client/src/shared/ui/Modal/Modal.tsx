import { ReactNode } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'

import cls from './Modal.module.scss'
import { Overlay } from '../Overlay'
import { Portal } from '../Portal'

interface ModalProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Содержимое модульного окна.
     */
    children?: ReactNode
    /**
     * @description Флаг для отображения/скрытия модального окна.
     */
    isOpen?: boolean
    /**
     * @description Callback для закрытия модального окна.
     */
    onClose?: () => void
    /**
     * @description Флаг, для отрисовки модального окна, только тогда, когда оно открыто.
     */
    lazy?: boolean
    /**
     * @description Флаг для отображения overlay.
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
