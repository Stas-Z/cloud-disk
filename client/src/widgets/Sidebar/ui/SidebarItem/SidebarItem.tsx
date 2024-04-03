import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink'
import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'

import cls from './SidebarItem.module.scss'
import { SidebarItemType } from '../../model/types/sidebar'

interface SidebarItemProps {
    className?: string
    item: SidebarItemType
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { className, item } = props
    const { t } = useTranslation()
    const isAuth = useSelector(getUserAuthData)

    if (item.authOnly && !isAuth) {
        return null
    }

    return (
        <AppLink
            className={classNames(cls.sidebarItem, {}, [className])}
            to={item.path}
            activeClassName={cls.active}
        >
            <HStack className={cls.icon} align="center" justify="center">
                <Icon Svg={item.Icon} color="grey" />
            </HStack>
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    )
})
