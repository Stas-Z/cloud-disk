import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.sidebar, {}, [className])}>
            <div />
        </div>
    )
})
