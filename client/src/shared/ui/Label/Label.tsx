import { ReactNode, memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Label.module.scss'

interface LabelProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Содержимое Label'а
     */
    children?: ReactNode
    /**
     * @description атрибут 'for' для Label'а
     */
    htmlFor?: string
}

export const Label = memo((props: LabelProps) => {
    const { className, children, htmlFor } = props

    return (
        <label
            htmlFor={htmlFor}
            className={classNames(cls.label, {}, [className])}
        >
            {children}
        </label>
    )
})
