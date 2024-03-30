import { memo, useCallback, useEffect, useRef } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import {
    getSelectedFileName,
    getSelectedFile,
    getCurrentDir,
    fileIconType,
    fileActions,
} from '@/entities/File'
import IconDownload from '@/shared/assets/icons/arrow-download.svg'
import Close from '@/shared/assets/icons/close.svg'
import RecycleIcon from '@/shared/assets/icons/recycle.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Button } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { MessageBox } from '@/shared/ui/MessageBox'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './FileToolBar.module.scss'
import { truncateFileName } from '../../../../entities/File/model/lib/truncateFileName/truncateFileName'
import {
    getfileToolbarIsDeleting,
    getfileToolbarIsDownloading,
} from '../../model/selectors/fileToolbarSelectors'
import { deleteFile } from '../../model/services/deleteFile/deleteFile'
import { downloadFile } from '../../model/services/downloadFile/downloadFile'

interface FileToolBarProps {
    className?: string
    isOpen: boolean
    onClose: () => void
    lazy?: boolean
}

export const FileToolBar = memo((props: FileToolBarProps) => {
    const { className, isOpen, onClose, lazy } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const isDeleting = useSelector(getfileToolbarIsDeleting)
    const isDownloading = useSelector(getfileToolbarIsDownloading)

    const currentDir = useSelector(getCurrentDir)
    const selectedFile = useSelector(getSelectedFile)

    const fileName = useSelector(getSelectedFileName)
    const truncateName = truncateFileName(fileName || '')

    const popupRef = useRef<HTMLDivElement>(null)

    const { close, isMounted } = useModal({
        animationDelay: 300,
        isOpen,
        onClose,
    })

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const clickedElement = event.target as HTMLElement
            if (
                popupRef.current &&
                !popupRef.current.contains(clickedElement)
            ) {
                const isClickInsideListItem =
                    clickedElement.closest('[id^="list-item-"]')
                if (!isClickInsideListItem) {
                    close()
                }
            }
        }

        const handleClick = (event: MouseEvent) => {
            if (isOpen) {
                handleOutsideClick(event)
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleClick)
        } else {
            document.removeEventListener('click', handleClick)
        }

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [close, isOpen])

    const downloadClickHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()

            if (selectedFile) {
                dispatch(downloadFile(selectedFile))
                dispatch(fileActions.setNoticeFileName(selectedFile.name))
            }
        },
        [dispatch, selectedFile],
    )
    const deleteClickHandler = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            if (selectedFile) {
                const result = await dispatch(
                    deleteFile({ fileId: selectedFile._id, dirId: currentDir }),
                )

                dispatch(fileActions.setNoticeFileName(selectedFile.name))

                if (result.meta.requestStatus === 'fulfilled') {
                    close()
                }
            }
        },
        [close, currentDir, dispatch, selectedFile],
    )

    if (lazy && !isMounted) {
        return null
    }

    return (
        <div ref={popupRef}>
            <HStack
                justify="between"
                className={classNames(
                    cls.fileToolBar,
                    { [cls.opened]: isOpen },
                    [className],
                )}
                gap="24"
            >
                <HStack max>
                    <HStack
                        className={cls.fileName}
                        align="center"
                        justify="start"
                        gap="24"
                        max
                    >
                        <Icon
                            Svg={fileIconType(selectedFile?.type)}
                            width={16}
                            height={16}
                            className={cls.fileIcon}
                        />
                        <Text text={truncateName} variant="white" />
                    </HStack>
                    <HStack gap="32" justify="end" max>
                        <Button
                            className={cls.toolButtons}
                            onClick={downloadClickHandler}
                            variant="clear"
                            textColor="whiteText"
                            addonLeft={
                                <Icon
                                    Svg={IconDownload}
                                    width={16}
                                    height={16}
                                    className={cls.icon}
                                />
                            }
                        >
                            {t('Download')}
                        </Button>
                        <Button
                            className={cls.toolButtons}
                            variant="clear"
                            textColor="whiteText"
                            onClick={deleteClickHandler}
                            addonLeft={
                                <Icon
                                    Svg={RecycleIcon}
                                    width={16}
                                    height={16}
                                    className={cls.icon}
                                />
                            }
                        >
                            {t('Delete')}
                        </Button>
                    </HStack>
                </HStack>
                <HStack>
                    <HStack className={cls.close} justify="center">
                        <Icon
                            Svg={Close}
                            clickable
                            onClick={close}
                            width={24}
                            height={24}
                            className={cls.icon}
                        />
                    </HStack>
                </HStack>
            </HStack>
            <MessageBox isDeleting={isDeleting} isDownloading={isDownloading} />
        </div>
    )
})
