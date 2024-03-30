import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'

import cls from './UserFilesFilters.module.scss'
import { useFileFilters } from '../../lib/hooks/useFileFilters'
import { FileSortSelector } from '../FileSortSelector/FileSortSelector'
import { FileViewSelector } from '../FileViewSelector/FileViewSelector'

interface UserFilesFiltersProps {
    className?: string
}

export const UserFilesFilters = memo((props: UserFilesFiltersProps) => {
    const { className } = props
    const { t } = useTranslation()

    const { sort, onChangeSort, view, onChangeView } = useFileFilters()

    return (
        <HStack
            gap="8"
            className={classNames(cls.userFilesFilters, {}, [className])}
        >
            <FileSortSelector onChangeSort={onChangeSort} sort={sort} />
            <FileViewSelector onChangeView={onChangeView} view={view} />
        </HStack>
    )
})
