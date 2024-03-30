import { memo, useCallback } from 'react'

import { useSelector } from 'react-redux'

import { breadcrumbsActions } from '@/entities/Breadcrumbs'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import {
    getCurrentDir,
    getSelectedFileId,
} from '../../model/selectors/fileSelectors/fileSelectors'
import { fileActions } from '../../model/slices/fileSlice'
import { FileView, MyFile } from '../../model/types/files'
import { FileGridItem } from '../FileGridItem/FileGridItem'
import { FileListItem } from '../FileListItem/FileListItem'

interface FileItemProps {
    className?: string
    file: MyFile
    view?: FileView
    onShowToolbar?: () => void
    toolbarIsOpen?: boolean
    pushToDirStackHandler?: (currentDir: string) => void
    setLastDirScrollHandler?: (currentDir: string, fileId: string) => void
}

export const FileItem = memo((props: FileItemProps) => {
    const {
        className,
        file,
        onShowToolbar,
        pushToDirStackHandler,
        setLastDirScrollHandler,
        toolbarIsOpen,
        view,
    } = props
    const dispatch = useAppDispatch()

    const currentDir = useSelector(getCurrentDir)

    const selectedItemId = useSelector(getSelectedFileId)
    const isSelected = selectedItemId === file._id && toolbarIsOpen

    const onClickHandler = useCallback(() => {
        dispatch(fileActions.setSelectedFile(file))

        if (onShowToolbar) {
            onShowToolbar()
        }
    }, [dispatch, file, onShowToolbar])

    const openDirHandler = useCallback(() => {
        if (file.type === 'dir') {
            dispatch(
                breadcrumbsActions.pushToStackBreadcrumbs({
                    name: file.name,
                    id: file._id,
                }),
            )
            if (pushToDirStackHandler) {
                pushToDirStackHandler(currentDir)
            }

            dispatch(fileActions.setCurrentDir(file._id))

            if (setLastDirScrollHandler) {
                setLastDirScrollHandler(currentDir, file._id)
            }
        }
    }, [
        currentDir,
        dispatch,
        file._id,
        file.name,
        file.type,
        pushToDirStackHandler,
        setLastDirScrollHandler,
    ])

    if (view === 'list') {
        return (
            <FileListItem
                className={className}
                file={file}
                key={file._id}
                onClickHandler={onClickHandler}
                openDirHandler={openDirHandler}
                isSelected={isSelected}
            />
        )
    }

    return (
        <FileGridItem
            file={file}
            key={file._id}
            onClickHandler={onClickHandler}
            openDirHandler={openDirHandler}
            isSelected={isSelected}
            view={view}
        />
    )
})
