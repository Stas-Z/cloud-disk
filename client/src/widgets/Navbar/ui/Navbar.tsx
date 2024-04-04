import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { AvatarDropdown } from '@/features/AvatarDropdown'
import { FileSearch } from '@/features/UserFilesFilters'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLogo } from '@/shared/ui/AppLogo'
import { HStack } from '@/shared/ui/Stack'

import cls from './Navbar.module.scss'

export interface NavbarProps {
    className?: string
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props
    const { t } = useTranslation('translation')

    return (
        <header className={classNames(cls.navbar, {}, [className])}>
            <HStack
                gap="16"
                className={cls.avatar}
                align="center"
                justify="between"
            >
                <HStack gap="24" justify="start" max>
                    <AppLogo width={79} height={40} />
                    <FileSearch />
                </HStack>
                <HStack justify="end" gap="24">
                    <AvatarDropdown />
                </HStack>
            </HStack>
        </header>
    )
})
