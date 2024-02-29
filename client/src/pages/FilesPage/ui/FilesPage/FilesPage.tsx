import { DragEvent, memo, useState } from 'react'

import { useSelector } from 'react-redux'

import { getCurrentDir } from '@/entities/File'
import {
    DragAndDrop,
    UserFilesList,
    uploadFiles,
} from '@/features/UserFilesList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'

import cls from './FilesPage.module.scss'

interface FilesPageProps {
    className?: string
}

const FilesPage = (props: FilesPageProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const currentDir = useSelector(getCurrentDir)

    const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }
    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }
    const dragProps = {
        onDragEnter: dragEnterHandler,
        onDragLeave: dragLeaveHandler,
        onDragOver: dragEnterHandler,
    }

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const { files } = e.dataTransfer
        if (files) {
            const fileList: File[] = Array.from(files)

            fileList.forEach((file) =>
                dispatch(uploadFiles({ dirId: currentDir, file })),
            )
        }
        setDragEnter(false)
    }

    if (dragEnter) {
        return (
            <Page
                className={classNames(cls.filesPageTsx, {}, [className])}
                restoreScroll
            >
                <DragAndDrop {...dragProps} onDrop={dropHandler} />
                <UserFilesList />
            </Page>
        )
    }
    return (
        <Page
            className={classNames(cls.filesPageTsx, {}, [className])}
            restoreScroll
            {...dragProps}
        >
            <UserFilesList />
        </Page>
    )
}
export default memo(FilesPage)
