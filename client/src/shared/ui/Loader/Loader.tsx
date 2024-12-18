import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Loader.module.scss'

interface LoaderProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
}

export const Loader = memo((props: LoaderProps) => {
    const { className } = props

    return (
        <div className={classNames(cls.loader, {}, [className])}>
            <div className={cls.spiner} />
        </div>
    )
})
