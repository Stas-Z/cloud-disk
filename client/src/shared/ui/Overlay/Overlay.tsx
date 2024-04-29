import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Overlay.module.scss'

interface OverlayProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Callback нажатия на компонент.
     */
    onClick?: () => void
}

export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick } = props

    return (
        <div
            onClick={onClick}
            className={classNames(cls.overlay, {}, [className])}
        />
    )
})
