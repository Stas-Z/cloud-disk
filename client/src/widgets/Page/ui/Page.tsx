import {
    DragEvent,
    MutableRefObject,
    ReactNode,
    useEffect,
    useRef,
} from 'react'

import { useSelector } from 'react-redux'

import { StateSchema } from '@/app/providers/StoreProvider'
import { getCurrentDir, getScrollSaveByDir } from '@/entities/File'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Page.module.scss'

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
    restoreScroll?: boolean
    onDragEnter?: (e: DragEvent<HTMLDivElement>) => void
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        restoreScroll = false,
        onDragEnter,
        onDragLeave,
        onDragOver,
    } = props

    const currentDir = useSelector(getCurrentDir)

    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>

    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSaveByDir(state, currentDir),
    )

    useEffect(() => {
        if (restoreScroll) {
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
            }, 100)
        }
    }, [currentDir, restoreScroll, scrollPosition])

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.page, {}, [className])}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
        >
            {children}

            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    )
}
