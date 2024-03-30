import { memo, useCallback, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getCurrentDir, getNoticeFileName } from '@/entities/File'
import { NoticePopup } from '@/entities/Notice'
import {
    FileToolBar,
    getfileToolbarError,
    getfileToolbarMessage,
    fileToolBarReducer,
} from '@/features/FileToolBar'
import { UploaderBar } from '@/features/UploaderBar'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { DragAndDrop, useDrag } from '@/widgets/DragAndDrop'
import { Page } from '@/widgets/Page'

import cls from './FilesPage.module.scss'
import { UserFilesList } from '../UserFilesList/UserFilesList'

interface FilesPageProps {
    className?: string
}

const initialReducers: ReducersList = {
    toolbar: fileToolBarReducer,
}

const FilesPage = (props: FilesPageProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const error = useSelector(getfileToolbarError)
    const message = useSelector(getfileToolbarMessage)
    const noticeFileName = useSelector(getNoticeFileName)

    const [fileToolbar, setFileToolbar] = useState(false)

    const onCloseToolbar = useCallback(() => {
        setFileToolbar(false)
    }, [])
    const onShowToolbar = useCallback(() => {
        setFileToolbar(true)
    }, [])

    const currentDir = useSelector(getCurrentDir)

    const { dragEnter, dragEnterHandler, dragLeaveHandler, dropHandler } =
        useDrag({ currentDir })

    const dragProps = {
        onDragEnter: dragEnterHandler,
        onDragLeave: dragLeaveHandler,
        onDragOver: dragEnterHandler,
    }

    const content = dragEnter ? (
        <Page
            className={classNames(cls.filesPage, {}, [className])}
            restoreScroll
        >
            <DragAndDrop {...dragProps} onDrop={dropHandler} />
            <UserFilesList />
        </Page>
    ) : (
        <Page
            className={classNames(cls.filesPage, {}, [className])}
            restoreScroll
            {...dragProps}
        >
            <FileToolBar isOpen={fileToolbar} onClose={onCloseToolbar} lazy />
            <UserFilesList
                onShowToolbar={onShowToolbar}
                toolbarIsOpen={fileToolbar}
            />
            <NoticePopup
                message={t(message, { file: noticeFileName })}
                error={t(error)}
            />
            <UploaderBar />
        </Page>
    )

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            {content}
        </DynamicModuleLoader>
    )
}
export default memo(FilesPage)
