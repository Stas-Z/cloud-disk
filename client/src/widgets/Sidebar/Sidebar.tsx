import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { CreateNewDirModal } from '@/features/CreateNewDir'
import { UploadFiles } from '@/features/UploadFiles'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'

import cls from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <VStack
            className={classNames(cls.sidebar, {}, [className])}
            max
            maxHeight
        >
            <VStack className={cls.stickyWrapper} max gap="8">
                <UploadFiles />
                <HStack max justify="center">
                    <CreateNewDirModal />
                </HStack>
            </VStack>
        </VStack>
    )
})
