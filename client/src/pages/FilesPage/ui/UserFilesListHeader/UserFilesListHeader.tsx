import { MutableRefObject, memo, useCallback, useRef } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
    breadcrumbsActions,
    BreadcrumbsList,
    getBreadcrumbsWithoutLast,
    getLastBreadcrumbName,
    defaultBreadcrumb,
} from '@/entities/Breadcrumbs'
import { fileActions, getCurrentDir } from '@/entities/File'
import { deleteLastDirScroll } from '@/features/ScrollSave'
import { UserFilesFilters } from '@/features/UserFilesFilters'
import ArrowBack from '@/shared/assets/icons/arrow-back.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Icon } from '@/shared/ui/Icon'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './UserFilesListHeader.module.scss'
import {
    getFilesWithoutLast,
    getLastFileId,
} from '../../model/selectors/filePageSelectors'
import { filesPageActions } from '../../model/slices/filesPageSlice'

interface UserFilesListHeaderProps {
    className?: string
}

export const UserFilesListHeader = memo((props: UserFilesListHeaderProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    const currentDir = useSelector(getCurrentDir)
    const lastName = useSelector(getLastBreadcrumbName)
    const lastFileId = useSelector(getLastFileId)
    const filesWithoutLast = useSelector(getFilesWithoutLast)
    const breadcrumbsWithoutLast = useSelector(getBreadcrumbsWithoutLast)

    const backClickHandler = useCallback(() => {
        dispatch(filesPageActions.setDirStack(filesWithoutLast))
        dispatch(fileActions.setCurrentDir(lastFileId))

        dispatch(breadcrumbsActions.setBreadcrumbs(breadcrumbsWithoutLast))

        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            dispatch(deleteLastDirScroll())
        }, 100)
    }, [breadcrumbsWithoutLast, dispatch, filesWithoutLast, lastFileId])

    const titleName =
        lastName && currentDir ? lastName.name : t(defaultBreadcrumb.name)

    const breadcrumbClickHandler = useCallback(
        (id: string | null) => {
            dispatch(fileActions.setCurrentDir(id))
            dispatch(filesPageActions.sliceDirStackById(id as string))
        },
        [dispatch],
    )

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            <BreadcrumbsList onClick={breadcrumbClickHandler} />
            <HStack max className={cls.title} justify="between">
                <HStack>
                    {currentDir && (
                        <HStack className={cls.back}>
                            <Icon
                                Svg={ArrowBack}
                                clickable
                                onClick={backClickHandler}
                            />
                        </HStack>
                    )}
                    <Text title={titleName} bold />
                </HStack>
                <UserFilesFilters />
            </HStack>
        </VStack>
    )
})
