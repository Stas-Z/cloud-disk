import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { userActions } from '@/entities/User'
import LogoutIcon from '@/shared/assets/icons/logout.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar'
import { Dropdown } from '@/shared/ui/Popups'

import cls from './AvatarDropdown.module.scss'

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props
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

    return (
        <Dropdown
            className={classNames(cls.avatarDropdown, {}, [className])}
            items={items}
            trigger={<Avatar size={34} />}
            direction="bottom_left"
            data-testid="AvatarDropdown"
        />
    )
})
