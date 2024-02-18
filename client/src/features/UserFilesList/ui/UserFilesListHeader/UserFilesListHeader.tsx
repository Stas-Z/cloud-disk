import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
    MyFile,
    fileActions,
    getCurrentDir,
    getCurrentFileName,
    getDirStack,
} from '@/entities/File'
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Icon } from '@/shared/ui/Icon'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './UserFilesListHeader.module.scss'

interface UserFilesListHeaderProps {
    className?: string
    files: MyFile[]
}

export const UserFilesListHeader = memo((props: UserFilesListHeaderProps) => {
    const { className, files } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const currentDir = useSelector(getCurrentDir)

    const currentName = useSelector(getCurrentFileName)

    const dirStack = useSelector(getDirStack)

    const lastFolderId = dirStack[dirStack.length - 1]

    const backClickHandler = useCallback(() => {
        const index = dirStack.indexOf(lastFolderId)

        dispatch(fileActions.popFromStack(index))
        dispatch(fileActions.setCurrentDir(lastFolderId))
    }, [dirStack, dispatch, lastFolderId])

    const titleName = currentName && currentDir ? currentName : t('Files')

    return (
        <HStack
            max
            className={classNames(cls.createNewDirHeader, {}, [className])}
        >
            {currentDir && (
                <HStack className={cls.back}>
                    <Icon
                        Svg={ArrowBack}
                        height={16}
                        width={16}
                        clickable
                        onClick={backClickHandler}
                    />
                </HStack>
            )}
            <Text title={titleName} bold />
        </HStack>
    )
})
