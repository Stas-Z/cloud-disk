import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUserEmail } from '@/entities/User'
import { AvatarDropdown } from '@/features/AvatarDropdown'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLogo } from '@/shared/ui/AppLogo'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'

import cls from './Navbar.module.scss'

export interface NavbarProps {
    className?: string
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props
    const { t } = useTranslation('translation')

    const email = useSelector(getUserEmail)

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <HStack
                gap="16"
                className={cls.avatar}
                align="center"
                justify="between"
            >
                <HStack gap="24" justify="start">
                    <AppLogo width={79} height={40} />
                    <Input
                        placeholder={t('Search my Disk')}
                        size="m"
                        className={cls.search}
                        addonRight={
                            <Icon
                                Svg={SearchIcon}
                                width={16}
                                height={16}
                                className={cls.searchIcon}
                            />
                        }
                    />
                </HStack>
                <HStack justify="end">
                    <AvatarDropdown email={email} />
                </HStack>
            </HStack>
        </header>
    )
})
