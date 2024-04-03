import { memo, useCallback, useState } from 'react'

import { useSelector } from 'react-redux'

import { getCurrentDir } from '@/entities/File'
import { NoticePopup } from '@/entities/Notice'
import { FileToolBar, fileToolBarReducer } from '@/features/FileToolBar'
import { UploaderBar } from '@/features/UploaderBar'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { DragAndDrop, useDrag } from '@/widgets/DragAndDrop'
import { Page } from '@/widgets/Page'

import { UserFilesList } from '../UserFilesList/UserFilesList'

interface FilesPageProps {
    className?: string
}

const initialReducers: ReducersList = {
    toolbar: fileToolBarReducer,
}

const FilesPage = (props: FilesPageProps) => {
    const { className } = props

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
        <Page className={classNames('', {}, [className])} restoreScroll>
            <DragAndDrop {...dragProps} onDrop={dropHandler} />
            <UserFilesList />
        </Page>
    ) : (
        <Page
            className={classNames('', {}, [className])}
            restoreScroll
            {...dragProps}
        >
            <FileToolBar isOpen={fileToolbar} onClose={onCloseToolbar} lazy />
            <UserFilesList
                onShowToolbar={onShowToolbar}
                toolbarIsOpen={fileToolbar}
            />
            <NoticePopup />
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
