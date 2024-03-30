import { memo } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './FileGridItem.module.scss'
import { fileIconType } from '../../model/lib/fileIconType/fileIconType'
import { truncateFileName } from '../../model/lib/truncateFileName/truncateFileName'
import { FileView, MyFile } from '../../model/types/files'

interface FileGridItemProps {
    className?: string
    file: MyFile
    onClickHandler: () => void
    openDirHandler: () => void
    isSelected?: boolean
    view?: FileView
}

export const FileGridItem = memo((props: FileGridItemProps) => {
    const {
        className,
        file,
        onClickHandler,
        openDirHandler,
        isSelected,
        view,
    } = props

    const big = view === 'big'
    const grid = view === 'grid'

    const truncateName = truncateFileName(
        file.name,
        big ? 42 : 24,
        big ? 30 : 17,
        big ? 12 : 7,
    )

    const mods: Mods = {
        [cls.selected]: isSelected,
        [cls.bigGrid]: big,
        [cls.grid]: grid,
    }

    return (
        <VStack
            className={classNames(cls.fileGridItem, mods, [className])}
            align="center"
            onDoubleClick={openDirHandler}
            id={`list-item-${file._id}`}
            onClick={onClickHandler}
            gap="8"
        >
            <VStack>
                <Icon
                    Svg={fileIconType(file.type)}
                    width={big ? 145 : 80}
                    height={big ? 145 : 80}
                    className={cls.iconFolder}
                />
            </VStack>
            <VStack className={cls.title} align="center" justify="start">
                <Text text={truncateName} size="s" align="center" />
            </VStack>
        </VStack>
    )
})
