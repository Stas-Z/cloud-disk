import { memo } from 'react'

import { UserFilesList } from '@/features/UserFilesList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

import cls from './FilesPage.module.scss'

interface FilesPageProps {
    className?: string
}

const FilesPage = (props: FilesPageProps) => {
    const { className } = props

    return (
        <Page
            className={classNames(cls.filesPageTsx, {}, [className])}
            restoreScroll
        >
            <UserFilesList />
        </Page>
    )
}
export default memo(FilesPage)
