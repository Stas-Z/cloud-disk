import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Divider.module.scss'

interface DividerProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
}

export const Divider = memo((props: DividerProps) => {
    const { className } = props

    return <hr className={classNames(cls.divider, {}, [className])} />
})
