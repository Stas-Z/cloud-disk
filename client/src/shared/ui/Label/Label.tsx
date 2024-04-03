import { ReactNode, memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Label.module.scss'

interface LabelProps {
    /**
     * @description additional class.
     */
    className?: string
    /**
     * @description Label content
     */
    children?: ReactNode
    /**
     * @description <label> attribute 'for'
     */
    htmlFor?: string
}

export const Label = memo((props: LabelProps) => {
    const { className, children, htmlFor } = props
    const { t } = useTranslation()

    return (
        <label
            htmlFor={htmlFor}
            className={classNames(cls.label, {}, [className])}
        >
            {children}
        </label>
    )
})
