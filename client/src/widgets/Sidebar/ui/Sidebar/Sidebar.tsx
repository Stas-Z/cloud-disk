import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { fileActions } from '@/entities/File'
import { CreateNewDirModal } from '@/features/CreateNewDir'
import { UploadFiles } from '@/features/UploadFiles'
import { UsedSpaceBar } from '@/features/UsedSpaceBar'
import Plus from '@/shared/assets/icons/plus.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { HStack, VStack } from '@/shared/ui/Stack'

import cls from './Sidebar.module.scss'
import { useSidebarItems } from '../../model/selectors/getSidebarItems'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [isAuthModal, setIsAuthModal] = useState(false)
    const [showError, setShowError] = useState(false)

    const showErrorHandler = useCallback(() => {
        setShowError(true)
    }, [])

    const sidebarItemsList = useSidebarItems()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
        setShowError(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
        dispatch(fileActions.setDirName(t('New Folder')))
    }, [dispatch, t])

    return (
        <>
            <VStack
                className={classNames(cls.sidebar, {}, [className])}
                max
                maxHeight
                gap="16"
            >
                <VStack className={cls.stickyWrapper} max>
                    <VStack max gap="16">
                        <VStack max gap="8">
                            <UploadFiles />
                            <HStack max justify="center">
                                <VStack max>
                                    <Button
                                        className={cls.addButton}
                                        onClick={onShowModal}
                                        variant="filled"
                                        color="white"
                                        fullWidth
                                        shadow
                                        addonLeft={
                                            <Icon
                                                Svg={Plus}
                                                height={24}
                                                width={24}
                                                className={cls.icon}
                                            />
                                        }
                                    >
                                        {t('Create folder')}
                                    </Button>
                                    <CreateNewDirModal
                                        isOpen={isAuthModal}
                                        onClose={onCloseModal}
                                        showErrorHandler={showErrorHandler}
                                        showError={showError}
                                    />
                                </VStack>
                            </HStack>
                        </VStack>

                        <VStack
                            role="navigation"
                            as="nav"
                            className={cls.menu}
                            max
                        >
                            {sidebarItemsList.map((item) => (
                                <SidebarItem item={item} key={item.path} />
                            ))}
                        </VStack>
                    </VStack>
                </VStack>
            </VStack>
            <UsedSpaceBar />
        </>
    )
})
