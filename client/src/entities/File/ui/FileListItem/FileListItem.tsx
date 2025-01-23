import { memo, useState } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './FileListItem.module.scss'
import { fileIconType } from '../../model/lib/fileIconType/fileIconType'
import { sizeFormat } from '../../model/lib/sizeFormat/sizeFormat'
import { MyFile } from '../../model/types/files'

interface FileListItemProps {
    className?: string
    file: MyFile
    onClickHandler: () => void
    openDirHandler: () => void
    isSelected?: boolean
}

export const FileListItem = memo((props: FileListItemProps) => {
    const { className, file, onClickHandler, openDirHandler, isSelected } =
        props

    const [lastTap, setLastTap] = useState(0)
    const doubleClickDelay = 300

    const handleTouchEnd = () => {
        const currentTime = Date.now()
        const timeDifference = currentTime - lastTap

        if (timeDifference < doubleClickDelay && timeDifference > 0) {
            openDirHandler?.()
        } else {
            onClickHandler?.()
        }

        setLastTap(currentTime)
    }

    const date = file.date?.slice(0, 10)
    const time = file.date?.slice(11, 16)

    // const onClickIconHandler = useCallback(() => {}, [])

    const fileSize = file.size ? sizeFormat(file.size) : '0B'

    return (
        <HStack
            max
            className={classNames(
                cls.fileListItem,
                { [cls.selected]: isSelected },
                [className],
            )}
            gap="16"
            align="center"
            onDoubleClick={openDirHandler}
            onTouchEnd={handleTouchEnd}
            id={`list-item-${file._id}`}
            onClick={onClickHandler}
        >
            <Icon
                Svg={fileIconType(file.type)}
                width={40}
                height={40}
                className={cls.iconFolder}
            />
            <HStack
                max
                align="center"
                className={cls.listInfo}
                justify="between"
            >
                <HStack max flexGrow={1}>
                    <Text
                        text={file.name}
                        size="s"
                        className={cls.title}
                        ellipsis
                    />
                </HStack>
                <HStack justify="end" max gap="16" className={cls.infoBlock}>
                    {/* // TODO: */}
                    {/* <HStack max align="center" justify="end" gap="4">
                        <Icon Svg={ViewIcon} />
                        <Text text="2" size="s" variant="grey" />
                    </HStack>
                    <HStack max align="center" justify="end" gap="4">
                        <Icon Svg={DownloadIcon} />
                        <Text text="0" size="s" variant="grey" />
                    </HStack> */}
                    <Text
                        text={date}
                        variant="grey"
                        size="s"
                        className={cls.info}
                        align="center"
                    />
                    <Text
                        text={time}
                        variant="grey"
                        size="s"
                        className={cls.info}
                        align="center"
                    />
                    {file.type !== 'dir' ? (
                        <Text
                            text={fileSize.toString()}
                            variant="grey"
                            size="s"
                            className={cls.info}
                            align="center"
                        />
                    ) : (
                        <div className={cls.info} />
                    )}
                </HStack>
            </HStack>
            {/* // TODO: */}
            {/* <HStack align="center" justify="end" className={cls.shareLink}>
                <Icon
                    Svg={ShareIcon}
                    height={24}
                    width={24}
                    className={cls.icon}
                    clickable
                    onClick={onClickIconHandler}
                />
            </HStack> */}
        </HStack>
    )
})
