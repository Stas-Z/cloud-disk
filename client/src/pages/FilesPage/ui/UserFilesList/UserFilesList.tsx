import { memo, useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'

import {
    FileList,
    getAllFiles,
    getCurrentDir,
    getFileIsLoading,
} from '@/entities/File'
import { scrollSaveActions } from '@/features/ScrollSave'
import {
    getFileFiltersSearch,
    getFileFiltersView,
} from '@/features/UserFilesFilters'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Loader } from '@/shared/ui/Loader'

import cls from './UserFilesList.module.scss'
import { fetchFilesList } from '../../../../entities/File/model/services/fetchFilesList/fetchFilesList'
import { initFilesPage } from '../../model/services/initFilesPage'
import { filesPageActions } from '../../model/slices/filesPageSlice'
import { EmptyPage } from '../EmptyPage/EmptyPage'
import { UserFilesListHeader } from '../UserFilesListHeader/UserFilesListHeader'

interface UserFilesProps {
    className?: string
    onShowToolbar?: () => void
    toolbarIsOpen?: boolean
}

export const UserFilesList = memo((props: UserFilesProps) => {
    const { className, onShowToolbar, toolbarIsOpen } = props
    const dispatch = useAppDispatch()
    const isLoading = useSelector(getFileIsLoading)

    const currentDir = useSelector(getCurrentDir)
    const view = useSelector(getFileFiltersView)

    useEffect(() => {
        dispatch(initFilesPage())
        dispatch(fetchFilesList({}))
    }, [dispatch, currentDir])

    const pushToDirStackHandler = useCallback(
        (currentDir: string) => {
            dispatch(filesPageActions.pushToDirStack(currentDir))
        },
        [dispatch],
    )
    const setLastDirScrollHandler = useCallback(
        (currentDir: string, fileId: string) => {
            dispatch(
                scrollSaveActions.setLastDirScroll({
                    path: currentDir,
                    position: fileId,
                }),
            )
        },
        [dispatch],
    )

    const files = useSelector(getAllFiles)
    const search = useSelector(getFileFiltersSearch)

    if (isLoading) {
        return (
            <div className={classNames(cls.userFiles, {}, [className])}>
                <UserFilesListHeader />
                <Loader />
            </div>
        )
    }

    if (files.length === 0 && !currentDir) {
        return <EmptyPage search={search} />
    }

    return (
        <div className={classNames(cls.userFiles, {}, [className])}>
            <UserFilesListHeader />
            <FileList
                files={files}
                onShowToolbar={onShowToolbar}
                toolbarIsOpen={toolbarIsOpen}
                pushToDirStackHandler={pushToDirStackHandler}
                setLastDirScrollHandler={setLastDirScrollHandler}
                view={view}
            />
        </div>
    )
})
