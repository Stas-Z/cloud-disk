import { DragEvent, ReactNode, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { StateSchema } from '@/app/providers/StoreProvider'
import { getCurrentDir, getFileIsLoading } from '@/entities/File'
import { getScrollSaveByDir } from '@/features/ScrollSave'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Page.module.scss'

interface PageProps {
    className?: string
    children: ReactNode
    restoreScroll?: boolean
    onDragEnter?: (e: DragEvent<HTMLDivElement>) => void
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        restoreScroll = false,
        onDragEnter,
        onDragLeave,
        onDragOver,
    } = props

    const currentDir = useSelector(getCurrentDir)
    const isLoading = useSelector(getFileIsLoading)
    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSaveByDir(state, currentDir),
    )

    useEffect(() => {
        if (restoreScroll && !isLoading) {
            setTimeout(() => {
                const target = document.getElementById(
                    `list-item-${scrollPosition}`,
                )

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    })
                }
            }, 200)
        }
    }, [isLoading, restoreScroll, scrollPosition])

    return (
        <main
            className={classNames(cls.page, {}, [className])}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
        >
            {children}
        </main>
    )
}
