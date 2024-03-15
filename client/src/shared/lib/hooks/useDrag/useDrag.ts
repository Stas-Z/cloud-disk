import { DragEvent, useState } from 'react'

import { AsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
// eslint-disable-next-line fsd-pathcheker/layer-imports
import { MyFile } from '@/entities/File'
// eslint-disable-next-line fsd-pathcheker/layer-imports
import { createFileDir } from '@/features/CreateNewDir'
// eslint-disable-next-line fsd-pathcheker/layer-imports
import { uploadFilesProps } from '@/features/UploadFiles'

import { useAppDispatch } from '../useAppDispatch/useAppDispatch'

interface useDragProps {
    currentDir: string
    uploadFiles: AsyncThunk<MyFile, uploadFilesProps, ThunkConfig<string>>
}

export function useDrag(props: useDragProps) {
    const { currentDir, uploadFiles } = props
    const dispatch = useAppDispatch()
    const [dragEnter, setDragEnter] = useState(false)

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

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        let i = 1
        const readDirectory = async (entry: any, currentDir: string) => {
            if (entry.isDirectory) {
                const newDirResponse = await dispatch(
                    createFileDir({
                        name: entry.name,
                        parent: currentDir,
                        type: 'dir',
                        updateList: !(i !== 1),
                    }),
                )
                // eslint-disable-next-line no-plusplus
                i++
                const newDirId =
                    typeof newDirResponse.payload === 'string'
                        ? newDirResponse.payload
                        : newDirResponse?.payload?._id || ''

                const directoryReader = entry.createReader()
                directoryReader.readEntries((entries: any) => {
                    entries.forEach((subEntry: any) => {
                        readDirectory(subEntry, newDirId)
                    })
                })
            } else {
                entry.file((file: File) => {
                    if (file) {
                        dispatch(
                            uploadFiles({
                                dirId: currentDir,
                                file,
                                updateList: false,
                            }),
                        )
                    }
                })
            }
        }

        const { items } = e.dataTransfer
        Array.from(items).forEach((item) => {
            const itemFile = item.webkitGetAsEntry()

            if (itemFile && itemFile.isDirectory === false) {
                const file = item.getAsFile()

                if (file) {
                    dispatch(uploadFiles({ dirId: currentDir, file }))
                }
            } else if (itemFile && itemFile.isDirectory === true) {
                const entry = item.webkitGetAsEntry()

                if (entry && entry.isDirectory) {
                    readDirectory(entry, currentDir)
                }
            }
        })

        setDragEnter(false)
    }

    return {
        dragEnterHandler,
        dragLeaveHandler,
        dropHandler,
        dragEnter,
    }
}
