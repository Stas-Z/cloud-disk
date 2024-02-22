import { MutableRefObject, ReactNode, useEffect, useRef } from 'react'

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
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd, restoreScroll = false } = props

    const currentDir = useSelector(getCurrentDir)

    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>

    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSaveByDir(state, currentDir),
    )

    useEffect(() => {
        if (restoreScroll) {
            setTimeout(() => {
                const target = document.getElementById(scrollPosition)

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
        >
            {children}

            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    )
}
