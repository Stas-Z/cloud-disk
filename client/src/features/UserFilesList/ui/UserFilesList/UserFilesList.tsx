import { memo, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { FileList, getCurrentDir } from '@/entities/File'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

import cls from './UserFilesList.module.scss'
import { getAllFiles } from '../../model/selectors/getAllFiles/getAllFiles'
import { fetchFilesList } from '../../model/services/fetchFilesList/fetchFilesList'
import { userFilesReducer } from '../../model/slices/userFilesSlice'
import { UserFilesListHeader } from '../UserFilesListHeader/UserFilesListHeader'

interface UserFilesProps {
    className?: string
}
const initialReducers: ReducersList = {
    userFiles: userFilesReducer,
}

export const UserFilesList = memo((props: UserFilesProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const currentDir = useSelector(getCurrentDir)

    useEffect(() => {
        dispatch(fetchFilesList(currentDir))
    }, [currentDir, dispatch])

    const files = useSelector(getAllFiles)
    return (
        <DynamicModuleLoader
            reducers={initialReducers}
            removeAfterUnmount={false}
        >
            <div className={classNames(cls.userFiles, {}, [className])}>
                <UserFilesListHeader files={files} />
                <FileList files={files} />
            </div>
        </DynamicModuleLoader>
    )
})
