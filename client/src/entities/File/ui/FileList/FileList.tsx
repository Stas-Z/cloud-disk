import { memo, useMemo } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/Stack'

import cls from './FileList.module.scss'
import { FileView, MyFile } from '../../model/types/files'
import { FileItem } from '../FileItem/FileItem'

interface FileListProps {
    className?: string
    files: MyFile[]
    isLoading?: boolean
    view?: FileView
    onShowToolbar?: () => void
    toolbarIsOpen?: boolean
    pushToDirStackHandler?: (currentDir: string) => void
    setLastDirScrollHandler?: (currentDir: string, fileId: string) => void
}

export const FileList = memo((props: FileListProps) => {
    const {
        className,
        files,
        isLoading,
        view,
        onShowToolbar,
        toolbarIsOpen,
        pushToDirStackHandler,
        setLastDirScrollHandler,
    } = props

    const renderFiles = (file: MyFile) => {
        return (
            <FileItem
                file={file}
                key={file._id}
                view={view}
                onShowToolbar={onShowToolbar}
                toolbarIsOpen={toolbarIsOpen}
                pushToDirStackHandler={pushToDirStackHandler}
                setLastDirScrollHandler={setLastDirScrollHandler}
            />
        )
    }

    const mods: Mods = {
        [cls.fileListBig]: view !== 'list',
    }

    const gridGag = useMemo(
        () => new Array(view === 'grid' ? 8 : 4).fill(null),
        [view],
    )

    return (
        <VStack
            max
            justify="between"
            className={classNames(cls.fileList, mods, [className])}
        >
            {files.length > 0 ? files.map((item) => renderFiles(item)) : null}

            {useMemo(
                () =>
                    gridGag.map((item, index) => (
                        <div
                            // eslint-disable-next-line
                            key={index}
                            className={classNames(
                                '',
                                {
                                    [cls.gridBigGag]: view === 'big',
                                    [cls.gridGag]: view === 'grid',
                                },
                                [],
                            )}
                        />
                    )),
                [gridGag, view],
            )}
        </VStack>
    )
})
