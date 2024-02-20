import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text } from '@/shared/ui/Text'

import cls from './BreadcrumbsListItem.module.scss'
import { breadcrumbsActions } from '../../model/slices/breadcrumbsSlice'
import { BreadcrumbItem } from '../../model/types/breadcrumbsSchema'

interface BreadcrumbsListItemProps {
    className?: string
    breadcrumb: BreadcrumbItem
    onClick?: (id: number | null) => void
}

export const BreadcrumbsListItem = memo((props: BreadcrumbsListItemProps) => {
    const { className, breadcrumb, onClick } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const onClickHandler = useCallback(() => {
        if (breadcrumb.id && onClick) {
            onClick(breadcrumb.id)
            dispatch(breadcrumbsActions.sliceBreadcrumsById(breadcrumb.id))
        }
    }, [breadcrumb.id, dispatch, onClick])

    return (
        <div
            className={classNames(cls.breadcrumbsListItem, {}, [className])}
            onClick={onClickHandler}
        >
            <Text text={t(breadcrumb.name)} size="s" variant="grey" />
        </div>
    )
})
