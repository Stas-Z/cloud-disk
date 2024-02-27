import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'

import cls from './FileList.module.scss'
import { FileView } from '../../model/consts/fileConsts'
import { MyFile } from '../../model/types/files'
import { FileListItem } from '../FileListItem/FileListItem'

interface FileListProps {
    className?: string
    files: MyFile[]
    isLoading?: boolean
    view?: FileView
}

export const FileList = memo((props: FileListProps) => {
    const { className, files, isLoading, view } = props

    const renderFiles = (file: MyFile) => {
        return <FileListItem file={file} view={view} key={file._id} />
    }

    return (
        <VStack
            max
            justify="between"
            className={classNames(cls.fileList, {}, [className])}
        >
            {files.length > 0 ? files.map((item) => renderFiles(item)) : null}
        </VStack>
    )
})
