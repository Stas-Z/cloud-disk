import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { Canceler } from 'axios'

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { noticeActions } from '@/entities/Notice'
import { createFileDir } from '@/features/CreateNewDir'
import { deleteFile } from '@/features/FileToolBar'
import { uploadFilesArrays, fileUploadHelper } from '@/features/UploadFiles'

interface FileWithParent {
    file: File
    parentDir: string // Родительская папка
}

export async function uploadDragFiles(
    dispatch: ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>,
    items: DataTransferItemList,
    currentDir: string,
    addCancelToken?: (fileId: string, cancel: Canceler) => void,
    userSpace?: number,
) {
    let folderName = '' // Создаём переменную для названия папки
    let folderId = '' // Создаём переменную для id папки
    const itemsWithOutDirectory = new DataTransfer()
    const itemsWithDirectory: FileWithParent[] = [] // Создаем пустой массив
    let totalSize = 0 // Создаём переменную для общего веса файлов
    const deleteDir = { id: '', name: '' } // Создаём объект для удаления если общий вес файлов превышает допустимый

    const uploadHandler = async (itemsWithDirectory: FileWithParent[]) => {
        try {
            if (itemsWithDirectory.length) {
                const uniqueParentIds = itemsWithDirectory.reduce(
                    (acc: string[], currentItem: FileWithParent) => {
                        if (!acc.includes(currentItem.parentDir)) {
                            acc.push(currentItem.parentDir)
                        }
                        return acc
                    },
                    [],
                )

                dispatch(
                    uploadFilesArrays({
                        dirId: uniqueParentIds,
                        files: itemsWithDirectory,
                        folderName,
                        folderId,
                        addCancelToken,
                    }),
                )
                dispatch(noticeActions.setNoticeFileName(folderName))
            }
        } catch (error) {
            console.error('Error uploading files:', error)
        }
    }

    const readDirectory = async (
        entry: any,
        currentDir: string,
        isUpdate: boolean,
    ) => {
        if (entry.isDirectory) {
            const newDirResponse = await dispatch(
                createFileDir({
                    name: entry.name,
                    parent: currentDir,
                    type: 'dir',
                    updateList: isUpdate,
                }),
            )

            const newDirId =
                typeof newDirResponse.payload === 'string'
                    ? newDirResponse.payload
                    : newDirResponse?.payload?._id || ''

            if (totalSize === 0) {
                deleteDir.id = newDirId
                deleteDir.name = entry.name
            }
            if (!folderId) {
                folderId = newDirId
            }

            const directoryReader = entry.createReader()
            const entries = await new Promise<any[]>((resolve) => {
                directoryReader.readEntries((result: any[]) => resolve(result))
            })
            // Рекурсивно обрабатываем каждую подпапку
            await Promise.all(
                entries.map((subEntry) =>
                    // При загрузку папки нам надо обновить список файлов только один раз. isUpdate:false
                    readDirectory(subEntry, newDirId, false),
                ),
            )
        } else {
            const file = await new Promise<File>((resolve, reject) => {
                entry.file((file: File) => {
                    if (file) {
                        resolve(file)
                    } else {
                        reject(new Error('Failed to get file'))
                    }
                })
            })
            if (file) {
                itemsWithDirectory.push({
                    file,
                    parentDir: currentDir,
                })
                totalSize += file.size
            }
        }
    }
    const processItems = async () => {
        const readPromises = Array.from(items).map(async (item) => {
            const itemFile = item.webkitGetAsEntry()

            if (itemFile && itemFile.isDirectory === false) {
                const file = item.getAsFile()
                if (file) {
                    itemsWithOutDirectory.items.add(file)
                    totalSize += file.size
                }
            } else if (itemFile && itemFile.isDirectory === true) {
                const entry = item.webkitGetAsEntry()

                if (entry && entry.isDirectory) {
                    folderName = entry.name

                    // При загрузку папки нам надо обновить список файлов только один раз. isUpdate:true
                    await readDirectory(itemFile, currentDir, true)
                }
            }
        })
        await Promise.all(readPromises)

        if (userSpace && totalSize > userSpace) {
            dispatch(noticeActions.setNoticeFileName(deleteDir.name))
            dispatch(deleteFile({ fileId: deleteDir.id, dirId: currentDir }))
            return
        }

        uploadHandler(itemsWithDirectory)

        fileUploadHelper({
            files: itemsWithOutDirectory.files,
            currentDir,
            dispatch,
            addCancelToken,
        })
    }
    try {
        // Дожидаемся завершения всех операций и вызываем uploadHandler
        await processItems()
    } catch (error) {
        console.error('Error uploading files:', error)
    }
}
