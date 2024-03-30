import { memo, useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { FileView } from '@/entities/File'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom-small.svg'
import Grid from '@/shared/assets/icons/view-grid.svg'
import LargeGrid from '@/shared/assets/icons/view-large-grid.svg'
import ListMenu from '@/shared/assets/icons/view-menu.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon'
import { ListBox, ListBoxItem } from '@/shared/ui/Popups/ui/ListBox/ListBox'

import cls from './FileViewSelector.module.scss'

interface FileViewSelectorProps {
    className?: string
    onChangeView: (newView: FileView) => void
    view: FileView
}

export const FileViewSelector = memo((props: FileViewSelectorProps) => {
    const { className, onChangeView, view } = props
    const { t } = useTranslation()

    const viewFieldOptions: ListBoxItem<FileView>[] = useMemo(
        () => [
            {
                value: 'big',
                content: t('Large grid'),
                Icon: LargeGrid,
            },
            {
                value: 'grid',
                content: t('Grid'),
                Icon: Grid,
            },
            {
                value: 'list',
                content: t('List'),
                Icon: ListMenu,
            },
        ],
        [t],
    )

    return (
        <div className={classNames(cls.fileViewSelector, {}, [className])}>
            <ListBox<FileView>
                onChange={onChangeView}
                value={view}
                items={viewFieldOptions}
                className={cls.fileListBox}
                direction="bottom_left"
                addonRight={
                    <Icon
                        Svg={ArrowIcon}
                        width={13}
                        height={8}
                        className={cls.iconRight}
                    />
                }
            />
        </div>
    )
})
