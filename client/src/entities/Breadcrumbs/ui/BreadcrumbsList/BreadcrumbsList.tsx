import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack } from '@/shared/ui/Stack'

import cls from './BreadcrumbsList.module.scss'
import { defaultBreadcrumb } from '../../model/consts/defaultBreadcrumb'
import {
    getBreadcrumbs,
    getBreadcrumbsWithoutLast,
} from '../../model/selectors/getBreadcrumSelector/getBreadcrumbSelector'
import { breadcrumbsActions } from '../../model/slices/breadcrumbsSlice'
import { BreadcrumbItem } from '../../model/types/breadcrumbsSchema'
import { BreadcrumbsListItem } from '../BreadcrumbsListItem/BreadcrumbsListItem'

interface BreadcrumbsProps {
    className?: string
    onClick: (id: string | null) => void
}

export const BreadcrumbsList = memo((props: BreadcrumbsProps) => {
    const { className, onClick } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const breadcrumbAll = useSelector(getBreadcrumbs)
    const breadcrumbsWithoutLast = useSelector(getBreadcrumbsWithoutLast)

    const renderBreadcrumbs = (breadcrumb: BreadcrumbItem) => {
        return (
            <BreadcrumbsListItem
                breadcrumb={breadcrumb}
                key={breadcrumb.id}
                onClick={onClick}
            />
        )
    }

    const onClickhandler = useCallback(() => {
        onClick(null)
        dispatch(breadcrumbsActions.sliceBreadcrumsById(null))
    }, [dispatch, onClick])

    if (breadcrumbAll.length > 0) {
        return (
            <HStack
                max
                gap="32"
                className={classNames(cls.breadcrumbs, {}, [className])}
            >
                <BreadcrumbsListItem
                    breadcrumb={defaultBreadcrumb}
                    key={defaultBreadcrumb.id}
                    onClick={onClickhandler}
                />

                {breadcrumbsWithoutLast.length > 0
                    ? breadcrumbsWithoutLast.map((item) =>
                          renderBreadcrumbs(item),
                      )
                    : null}
            </HStack>
        )
    }

    return (
        <HStack
            max
            gap="32"
            className={classNames(cls.noBreadcrumbs, {}, [className])}
        >
            <div />
        </HStack>
    )
})
