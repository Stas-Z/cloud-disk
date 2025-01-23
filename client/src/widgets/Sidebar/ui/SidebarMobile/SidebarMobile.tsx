import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'

import { useSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItemMobile } from '../SidebarItemMobile/SidebarItemMobile'

interface SidebarMobileProps {
    className?: string
}

export const SidebarMobile = memo((props: SidebarMobileProps) => {
    const { className } = props

    const sidebarItemsList = useSidebarItems()

    return (
        <VStack
            className={classNames('', {}, [className])}
            max
            maxHeight
            gap="16"
        >
            <VStack max>
                <HStack role="navigation" as="nav" max>
                    {sidebarItemsList.map((item) => (
                        <SidebarItemMobile item={item} key={item.path} />
                    ))}
                </HStack>
            </VStack>
        </VStack>
    )
})
