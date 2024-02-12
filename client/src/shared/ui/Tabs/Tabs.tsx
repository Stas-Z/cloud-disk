import { ReactNode, memo, useCallback } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Tabs.module.scss'
import { Button } from '../Button'

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    /**
     * @description additional class.
     */
    className?: string
    /**
     * @description The tabs items to display
     */
    tabs: TabItem[]
    /**
     * @description The value of Tab
     */
    value: string
    /**
     * @description Called when a tab is clicked
     * @param {TabItem} tab
     */
    onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
    const { className, onTabClick, tabs, value } = props

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab)
        },
        [onTabClick],
    )

    return (
        <div className={classNames(cls.tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Button
                    variant="filled"
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                    color={tab.value === value ? 'normal' : 'transaprent'}
                >
                    {tab.content}
                </Button>
            ))}
        </div>
    )
})
