import { MutableRefObject, ReactNode, UIEvent, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { StateSchema } from '@/app/providers/StoreProvider'
import { getScrollSaveByPath, scrollSaveActions } from '@/features/ScrollSave'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'

import cls from './Page.module.scss'

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
    parentRef?: MutableRefObject<HTMLDivElement>
    saveScroll?: boolean
}

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd,
        parentRef,
        saveScroll = false,
    } = props

    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSaveByPath(state, pathname),
    )
    const dispatch = useAppDispatch()

    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() => {
        if (saveScroll) {
            wrapperRef.current.scrollTop = scrollPosition
        }
    }, [saveScroll, scrollPosition])

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        if (saveScroll) {
            dispatch(
                scrollSaveActions.setScrollPosition({
                    position: e.currentTarget.scrollTop,
                    path: pathname,
                }),
            )
        }
    }, 500)

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    )
}
