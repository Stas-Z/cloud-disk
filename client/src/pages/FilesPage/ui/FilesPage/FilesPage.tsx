import { memo, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { FileList } from '@/entities/File'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'

import cls from './FilesPage.module.scss'
import { getAllFiles } from '../../model/selectors/getAllFiles/getAllFiles'
import { getFileCurrentDir } from '../../model/selectors/getFileCurrentDir/getFileCurrentDir'
import { fetchFilesList } from '../../model/services/fetchFilesList/fetchFilesList'

interface FilesPageProps {
    className?: string
}

const FilesPage = (props: FilesPageProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const files = useSelector(getAllFiles.selectAll)

    const currentDir = useSelector(getFileCurrentDir)

    useEffect(() => {
        dispatch(fetchFilesList(currentDir))
    }, [currentDir, dispatch])

    return (
        <Page className={classNames(cls.filesPageTsx, {}, [className])}>
            <FileList files={files} />
        </Page>
    )
}
export default memo(FilesPage)
