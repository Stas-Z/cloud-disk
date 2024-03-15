import { memo, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { FileList, getAllFiles, getCurrentDir } from '@/entities/File'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './UserFilesList.module.scss'
import { fetchFilesList } from '../../../../entities/File/model/services/fetchFilesList/fetchFilesList'
import { UserFilesListHeader } from '../UserFilesListHeader/UserFilesListHeader'

interface UserFilesProps {
    className?: string
    onShowToolbar?: () => void
    toolbarIsOpen?: boolean
}

export const UserFilesList = memo((props: UserFilesProps) => {
    const { className, onShowToolbar, toolbarIsOpen } = props
    const dispatch = useAppDispatch()

    const currentDir = useSelector(getCurrentDir)

    useEffect(() => {
        dispatch(fetchFilesList(currentDir))
    }, [currentDir, dispatch])

    const files = useSelector(getAllFiles)

    return (
        <div className={classNames(cls.userFiles, {}, [className])}>
            <UserFilesListHeader />
            <FileList
                files={files}
                onShowToolbar={onShowToolbar}
                toolbarIsOpen={toolbarIsOpen}
            />
        </div>
    )
})
