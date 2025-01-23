import { memo, useCallback, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { FileSortFiled } from '@/entities/File'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom-small.svg'
import ListMenu from '@/shared/assets/icons/list-menu.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice'
import { useDrawer } from '@/shared/ui/Drawer'
import { Icon } from '@/shared/ui/Icon'
import { ListBox, ListBoxItem } from '@/shared/ui/Popups/ui/ListBox/ListBox'
import { RadioGroup } from '@/shared/ui/RadioGroup'

import cls from './FileSortSelector.module.scss'

interface FileSortSelectorProps {
    className?: string
    onChangeSort: (newSort: FileSortFiled) => void
    sort: FileSortFiled
}

export const FileSortSelector = memo((props: FileSortSelectorProps) => {
    const { className, onChangeSort, sort } = props
    const { t } = useTranslation()

    const isMobile = useDevice()
    const closeDrawer = useDrawer()

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

    const onChange = useCallback(
        (newSort: FileSortFiled) => {
            onChangeSort(newSort)
            closeDrawer()
        },
        [closeDrawer, onChangeSort],
    )

    if (isMobile) {
        return (
            <RadioGroup
                onChange={onChange}
                value={sort}
                items={sortFieldOptions}
                label={t('Sort by')}
                className={cls.radioGrup}
            />
        )
    }

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
                addonLeft={<Icon Svg={ListMenu} className={cls.icon} />}
            />
        </div>
    )
})
