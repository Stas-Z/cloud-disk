import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData, userActions } from '@/entities/User'
import LogoutIcon from '@/shared/assets/icons/logout.svg'
import UsersIcon from '@/shared/assets/icons/menu-users.svg'
import { getRouteProfile } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './AvatarDropdown.module.scss'

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userData = useSelector(getUserData)

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (!userData || !userData.id) {
        return null
    }
    const items = [
        {
            id: '1',
            Icon: UsersIcon,
            content: t('Profile'),
            href: getRouteProfile(),
        },
        {
            id: '2',
            Icon: LogoutIcon,
            content: t('Sign out'),
            onClick: onLogout,
        },
    ]
    const avatar = userData?.avatar
        ? `${__STATIC__}/${userData.id}/${userData.avatar}`
        : ''
    const userAvatar = (
        <VStack align="center" className={cls.avatar} gap="8">
            <Avatar size={64} src={avatar} />
            <VStack align="center">
                <Text text={userData.username} size="m" bold />
                <Text text={userData.email} size="s" />
            </VStack>
        </VStack>
    )

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            items={items}
            trigger={<Avatar size={34} src={avatar} />}
            direction="bottom_left"
            addonTop={userAvatar}
        />
    )
})
