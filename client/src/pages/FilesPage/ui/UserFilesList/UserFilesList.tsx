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
    getFileFiltersSort,
    getFileFiltersView,
    userFilesFiltersActions,
} from '@/features/UserFilesFilters'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Loader } from '@/shared/ui/Loader'

import cls from './UserFilesList.module.scss'
import { fetchFilesList } from '../../../../entities/File/model/services/fetchFilesList/fetchFilesList'
import { filesPageActions } from '../../model/slices/filesPageSlice'
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

    const sort = useSelector(getFileFiltersSort)
    const search = useSelector(getFileFiltersSearch)

    const currentDir = useSelector(getCurrentDir)
    const view = useSelector(getFileFiltersView)

    useEffect(() => {
        dispatch(userFilesFiltersActions.initState())
        dispatch(fetchFilesList({ sort, search }))
    }, [currentDir, dispatch, search, sort])

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

    if (isLoading) {
        return (
            <div className={classNames(cls.userFiles, {}, [className])}>
                <UserFilesListHeader />
                <Loader />
            </div>
        )
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
