import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createFileDir } from '@/features/CreateNewDir'
import { uploadFiles } from '@/features/UploadFiles'

export function uploadDragFiles(
    dispatch: ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>,
    items: DataTransferItemList,
    currentDir: string,
) {
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

            i += 1
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
}
