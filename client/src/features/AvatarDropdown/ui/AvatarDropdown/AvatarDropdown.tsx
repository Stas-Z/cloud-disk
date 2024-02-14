import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { userActions } from '@/entities/User'
import LogoutIcon from '@/shared/assets/icons/logout.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Dropdown } from '@/shared/ui/Popups'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './AvatarDropdown.module.scss'

interface AvatarDropdownProps {
    className?: string
    email?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className, email } = props
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const items = [
        {
            id: '1',
            Icon: LogoutIcon,
            content: t('Sign out'),
            onClick: onLogout,
        },
    ]

    const userAvatar = (
        <VStack align="center" className={cls.avatar} gap="8">
            <Avatar size={64} />
            <Text text={email} size="s" />
        </VStack>
    )

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            items={items}
            trigger={<Avatar size={34} />}
            direction="bottom_left"
            userAvatar={userAvatar}
        />
    )
})
