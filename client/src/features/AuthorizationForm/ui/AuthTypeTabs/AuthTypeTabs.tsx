import { ReactNode, memo, useCallback, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card'
import { TabItem, Tabs } from '@/shared/ui/Tabs'

import { AuthType } from '../../model/consts/authConsts'

interface AuthTypeTabsProps {
    className?: string
    value: AuthType
    onChangeType: (type: AuthType) => void
}

export const AuthTypeTabs = memo((props: AuthTypeTabsProps) => {
    const { className, onChangeType, value } = props
    const { t } = useTranslation()

    const typeTabs: TabItem[] = useMemo(
        () =>
            Object.values(AuthType).map((type) => ({
                value: type,
                content: t(type) as ReactNode,
            })),
        [t],
    )

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as AuthType)
        },
        [onChangeType],
    )

    return (
        <Card variant="outlined" padding="0" border="round">
            <Tabs
                tabs={typeTabs}
                value={value}
                onTabClick={onTabClick}
                className={classNames('', {}, [className])}
            />
        </Card>
    )
})
