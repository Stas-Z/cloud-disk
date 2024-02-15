import { ReactNode } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
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

    if (switchOn) {
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
