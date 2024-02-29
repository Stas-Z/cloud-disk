import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import {
    CreateNewDirModal,
    createFileDir,
    UploadFiles,
} from '@/features/UserFilesList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack, VStack } from '@/shared/ui/Stack'

import cls from './Sidebar.module.scss'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const createDirHandler = useCallback(
        (name: string, parent: string) => {
            dispatch(
                createFileDir({
                    name,
                    parent,
                    type: 'dir',
                }),
            )
        },
        [dispatch],
    )

    return (
        <VStack
            className={classNames(cls.sidebar, {}, [className])}
            max
            maxHeight
            gap="8"
        >
            <UploadFiles />
            <HStack max justify="center">
                <CreateNewDirModal onAccept={createDirHandler} />
            </HStack>
        </VStack>
    )
})
