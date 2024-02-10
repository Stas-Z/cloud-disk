import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import SearchIcon from '@/shared/assets/icons/search.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLogo } from '@/shared/ui/AppLogo'
import { Avatar } from '@/shared/ui/Avatar'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'

import cls from './Navbar.module.scss'

export interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation('translation')
    const [isAuthModal, setIsAuthModal] = useState(false)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

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
                    <Avatar size={34} />
                </HStack>
            </HStack>
        </header>
    )
})
