import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Divider.module.scss'

interface DividerProps {
    className?: string
}

export const Divider = memo((props: DividerProps) => {
    const { className } = props
    const { t } = useTranslation()

    return <hr className={classNames(cls.divider, {}, [className])} />
})
