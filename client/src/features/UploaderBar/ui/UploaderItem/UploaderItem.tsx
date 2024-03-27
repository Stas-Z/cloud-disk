import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { FileIconType, MyFile, getCurrentDir } from '@/entities/File'
// eslint-disable-next-line fsd-pathcheker/layer-imports
import { deleteFile } from '@/features/FileToolBar'
import Close from '@/shared/assets/icons/close.svg'
import Succes from '@/shared/assets/icons/succes.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useCancelTokens } from '@/shared/lib/hooks/useCancelTokens/useCancelTokens'
import { useHover } from '@/shared/lib/hooks/useHover/useHover'
import { Icon } from '@/shared/ui/Icon'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './UploaderItem.module.scss'
import { uploaderBarActions } from '../../model/slices/uploaderBarSlice'

interface UploaderItemProps {
    className?: string
    file: MyFile
}

export const UploaderItem = memo((props: UploaderItemProps) => {
    const { className, file } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [isHover, bindHover] = useHover()
    const currentDir = useSelector(getCurrentDir)

    const { cancelTokens, removeCancelToken } = useCancelTokens()

    const onCancelHandler = useCallback(() => {
        const cancel = cancelTokens[file._id]
        if (cancel) {
            cancel()
            removeCancelToken(file._id)
        }

        if (file.type === 'dir') {
            dispatch(deleteFile({ fileId: file._id, dirId: currentDir }))
        }
        dispatch(uploaderBarActions.cancelUploadedFiles(file._id))
    }, [
        cancelTokens,
        currentDir,
        dispatch,
        file._id,
        file.type,
        removeCancelToken,
    ])

    return (
        <HStack
            {...bindHover}
            className={classNames(cls.uploaderItem, { [cls.hover]: isHover }, [
                className,
            ])}
        >
            <HStack className={cls.uploaderIcon}>
                <Icon
                    Svg={FileIconType(file?.type)}
                    width={40}
                    height={40}
                    className={cls.fileIcon}
                />
                {file.progress === 100 && (
                    <Icon
                        className={cls.fileSucces}
                        Svg={Succes}
                        color="white"
                    />
                )}
            </HStack>
            <VStack className={cls.fileInfo} align="start" justify="center" max>
                <Text text={file.name} size="s" />
                <Text
                    text={file.size}
                    size="s"
                    variant="grey"
                    className={cls.fileSize}
                />
            </VStack>
            <HStack className={cls.itemRight} align="center" justify="end">
                <div className={cls.progressBar}>
                    <div
                        className={cls.uploadBar}
                        style={{ width: `${file.progress}%` }}
                    />
                </div>
                <HStack
                    className={classNames(cls.cancel, { [cls.show]: isHover }, [
                        className,
                    ])}
                    justify="center"
                >
                    <Icon
                        Svg={Close}
                        clickable
                        onClick={onCancelHandler}
                        width={16}
                        height={16}
                        className={cls.icon}
                        color="black"
                    />
                </HStack>
            </HStack>
        </HStack>
    )
})
