import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { createFileDir } from '@/features/CreateNewDir'
import { uploadFile, uploadFilesArrays } from '@/features/UploadFiles'

interface FileWithParent {
    file: File
    parentDir: string // Родительская папка
    updateList?: boolean
}

export async function uploadDragFiles(
    dispatch: ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>,
    items: DataTransferItemList,
    currentDir: string,
) {
    const itemsWithDirectory: FileWithParent[] = [] // Создаем пустой массив

    const uploadHandler = (itemsWithDirectory: FileWithParent[]) => {
        // Группируем файлы по родительским папкам
        const filesByDir = itemsWithDirectory.reduce<{
            [dirId: string]: File[]
        }>((acc, { file, parentDir }) => {
            if (!acc[parentDir]) {
                acc[parentDir] = []
            }
            acc[parentDir].push(file)
            return acc
        }, {})

        Object.entries(filesByDir).forEach(([dirId, files]) => {
            if (files.length) {
                try {
                    dispatch(
                        uploadFilesArrays({ dirId, files, updateList: false }),
                    )
                } catch (error) {
                    console.error('Error uploading files:', error)
                    // Обработка ошибки
                }
            } else {
                console.log('No files for directory:', dirId) // Отладочное сообщение, если нет файлов для текущей директории
            }
        })
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
                    updateList: false,
                })
            }
        }
    }
    const processItems = async () => {
        const readPromises = Array.from(items).map(async (item) => {
            const itemFile = item.webkitGetAsEntry()

            if (itemFile && itemFile.isDirectory === false) {
                const file = item.getAsFile()
                if (file) {
                    await dispatch(uploadFile({ dirId: currentDir, file }))
                }
            } else if (itemFile && itemFile.isDirectory === true) {
                const entry = item.webkitGetAsEntry()

                if (entry && entry.isDirectory) {
                    // При загрузку папки нам надо обновить список файлов только один раз. isUpdate:true
                    await readDirectory(itemFile, currentDir, true)
                }
            }
        })
        await Promise.all(readPromises)

        uploadHandler(itemsWithDirectory)
    }
    try {
        // Дожидаемся завершения всех операций и вызываем uploadHandler
        await processItems()
    } catch (error) {
        console.error('Error uploading files:', error)
    }
}
