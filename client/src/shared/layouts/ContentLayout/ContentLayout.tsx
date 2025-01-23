import { ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice'
import { HStack, VStack } from '@/shared/ui/Stack'

import cls from './ContentLayout.module.scss'

interface ContentLayoutProps {
    className?: string
    content: ReactNode
    sidebar: ReactNode
    switchOn?: boolean
}

export const ContentLayout = (props: ContentLayoutProps) => {
    const { className, content, sidebar, switchOn = false } = props
    const isMobile = useDevice()

    if (switchOn) {
        if (isMobile) {
            return (
                <VStack
                    align="unset"
                    className={classNames(cls.contentLayout, {}, [className])}
                >
                    <VStack className={cls.sidebarMobile}>{sidebar}</VStack>
                    <VStack max className={cls.content}>
                        {content}
                    </VStack>
                </VStack>
            )
        }
        return (
            <HStack
                align="unset"
                className={classNames(cls.contentLayout, {}, [className])}
            >
                <VStack className={cls.sidebar}>{sidebar}</VStack>
                <VStack max className={cls.content}>
                    {content}
                </VStack>
            </HStack>
        )
    }

    return content
}
