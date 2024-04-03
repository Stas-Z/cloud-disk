import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { CreateNewDirModal } from '@/features/CreateNewDir'
import { UploadFiles } from '@/features/UploadFiles'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'

import cls from './Sidebar.module.scss'
import { useSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props
    const { t } = useTranslation()
    const sidebarItemsList = useSidebarItems()

    return (
        <VStack
            className={classNames(cls.sidebar, {}, [className])}
            max
            maxHeight
            gap="16"
        >
            <VStack className={cls.stickyWrapper} max>
                <VStack max gap="16">
                    <VStack max gap="8">
                        <UploadFiles />
                        <HStack max justify="center">
                            <CreateNewDirModal />
                        </HStack>
                    </VStack>

                    <VStack role="navigation" as="nav" className={cls.menu} max>
                        {sidebarItemsList.map((item) => (
                            <SidebarItem item={item} key={item.path} />
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    )
})
