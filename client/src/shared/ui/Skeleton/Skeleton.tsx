import { CSSProperties, memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Skeleton.module.scss'

interface SkeletonProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Высота.
     */
    height?: string | number
    /**
     * @description Ширина.
     */
    width?: string | number
    /**
     * @description Закругление углов.
     */
    border?: string
}

export const Skeleton = memo((props: SkeletonProps) => {
    const { className, border, height, width } = props

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    }

    return (
        <div
            className={classNames(cls.skeleton, {}, [className])}
            style={styles}
        >
            <div />
        </div>
    )
})
