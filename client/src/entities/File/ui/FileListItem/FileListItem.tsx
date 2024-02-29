import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { breadcrumbsActions } from '@/entities/Breadcrumbs'
import DownloadIcon from '@/shared/assets/icons/arrow-download.svg'
import FileImgIcon from '@/shared/assets/icons/file-img.svg'
import FileRarIcon from '@/shared/assets/icons/file-rar.svg'
import FileTxtIcon from '@/shared/assets/icons/file-txt.svg'
import FileZipIcon from '@/shared/assets/icons/file-zip.svg'
import FileIcon from '@/shared/assets/icons/file.svg'
import FolderIcon from '@/shared/assets/icons/folder.svg'
import ShareIcon from '@/shared/assets/icons/share-link.svg'
import ViewIcon from '@/shared/assets/icons/views-icon.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './FileListItem.module.scss'
import { FileView } from '../../model/consts/fileConsts'
import { getCurrentDir } from '../../model/selectors/fileSelectors'
import { fileActions } from '../../model/slices/fileSlice'
import { MyFile } from '../../model/types/files'

interface FileListItemProps {
    className?: string
    file: MyFile
    view?: FileView
}

export const FileListItem = memo((props: FileListItemProps) => {
    const { className, file, view } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const currentDir = useSelector(getCurrentDir)

    const date = file.date?.slice(0, 10)
    const time = file.date?.slice(11, 16)

    const onClickHandler = useCallback(() => {}, [])

    const openDirHandler = useCallback(() => {
        dispatch(
            breadcrumbsActions.pushToStackBreadcrumbs({
                name: file.name,
                id: file._id,
            }),
        )
        dispatch(fileActions.pushToDirStack(currentDir))

        if (file.type === 'dir') {
            dispatch(fileActions.setCurrentDir(file._id))

            dispatch(
                fileActions.setLastDirScroll({
                    path: currentDir,
                    position: file._id,
                }),
            )
        }
    }, [currentDir, dispatch, file._id, file.name, file.type])

    const iconMap: {
        [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    } = {
        dir: FolderIcon,
        file: FileIcon,
        png: FileImgIcon,
        jpg: FileImgIcon,
        tif: FileImgIcon,
        txt: FileTxtIcon,
        rar: FileRarIcon,
        zip: FileZipIcon,
    }

    return (
        <HStack
            max
            className={classNames(cls.fileListItem, {}, [className])}
            gap="16"
            align="center"
            onDoubleClick={openDirHandler}
            id={file._id.toString()}
        >
            <Icon
                Svg={iconMap[file.type || 'file'] || FileIcon}
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
                    <Text text={file.name} size="s" className={cls.title} />
                </HStack>
                <HStack justify="end" max gap="16">
                    <HStack max align="center" justify="end" gap="4">
                        <Icon Svg={ViewIcon} height={16} width={16} />
                        <Text text="2" size="s" variant="grey" />
                    </HStack>
                    <HStack max align="center" justify="end" gap="4">
                        <Icon Svg={DownloadIcon} height={16} width={16} />
                        <Text text="0" size="s" variant="grey" />
                    </HStack>
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
                    <Text
                        text={file.size}
                        variant="grey"
                        size="s"
                        className={cls.info}
                        align="center"
                    />
                </HStack>
            </HStack>
            <HStack align="center" justify="end" className={cls.shareLink}>
                <Icon
                    Svg={ShareIcon}
                    height={24}
                    width={24}
                    className={cls.icon}
                    clickable
                    onClick={onClickHandler}
                />
            </HStack>
        </HStack>
    )
})
