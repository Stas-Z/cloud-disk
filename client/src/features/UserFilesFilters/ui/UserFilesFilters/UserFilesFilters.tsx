import { memo, useCallback, useState } from 'react'

import Dots from '@/shared/assets/icons/dots.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice'
import { Drawer } from '@/shared/ui/Drawer'
import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'

import { useFileFilters } from '../../lib/hooks/useFileFilters'
import { FileSortSelector } from '../FileSortSelector/FileSortSelector'
import { FileViewSelector } from '../FileViewSelector/FileViewSelector'

interface UserFilesFiltersProps {
    className?: string
}

export const UserFilesFilters = memo((props: UserFilesFiltersProps) => {
    const { className } = props

    const isMobile = useDevice()

    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const { sort, onChangeSort, view, onChangeView } = useFileFilters()

    if (isMobile) {
        return (
            <>
                <Icon
                    Svg={Dots}
                    onClick={onOpenDrawer}
                    clickable
                    width={24}
                    height={24}
                    color="grey"
                />
                <Drawer onClose={onCloseDrawer} isOpen={isOpen} lazy>
                    <FileViewSelector onChangeView={onChangeView} view={view} />
                    <FileSortSelector onChangeSort={onChangeSort} sort={sort} />
                </Drawer>
            </>
        )
    }
    return (
        <HStack gap="8" className={classNames('', {}, [className])}>
            <FileSortSelector onChangeSort={onChangeSort} sort={sort} />
            <FileViewSelector onChangeView={onChangeView} view={view} />
        </HStack>
    )
})
