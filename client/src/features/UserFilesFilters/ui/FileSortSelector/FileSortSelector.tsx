import { memo, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { FileSortFiled } from '@/entities/File'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom-small.svg'
import ListMenu from '@/shared/assets/icons/list-menu.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon'
import { ListBox, ListBoxItem } from '@/shared/ui/Popups/ui/ListBox/ListBox'

import cls from './FileSortSelector.module.scss'

interface FileSortSelectorProps {
    className?: string
    onChangeSort: (newSort: FileSortFiled) => void
    sort: FileSortFiled
}

export const FileSortSelector = memo((props: FileSortSelectorProps) => {
    const { className, onChangeSort, sort } = props
    const { t } = useTranslation()

    const sortFieldOptions: ListBoxItem<FileSortFiled>[] = useMemo(
        () => [
            {
                value: 'name',
                content: t('Name'),
            },
            {
                value: 'size',
                content: t('Size'),
            },
            {
                value: 'type',
                content: t('Type'),
            },
            {
                value: 'date',
                content: t('Date'),
            },
        ],
        [t],
    )

    return (
        <div className={classNames(cls.fileSortSelector, {}, [className])}>
            <ListBox<FileSortFiled>
                onChange={onChangeSort}
                value={sort}
                items={sortFieldOptions}
                label={t('By')}
                className={cls.fileListBox}
                addonRight={
                    <Icon
                        Svg={ArrowIcon}
                        width={13}
                        height={8}
                        className={cls.icon}
                    />
                }
                addonLeft={
                    <Icon
                        Svg={ListMenu}
                        width={16}
                        height={16}
                        className={cls.icon}
                    />
                }
            />
        </div>
    )
})
