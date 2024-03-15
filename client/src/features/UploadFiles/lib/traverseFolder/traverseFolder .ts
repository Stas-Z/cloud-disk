import { MyFolder } from '@/entities/File'

export const traverseFolder = async (
    folder: MyFolder,
    parentDirId: string,
    formData: FormData,
): Promise<void> => {
    // Обходим все элементы в папке
    const folderEntries = await folder.getAllEntries()
    // Создаем массив промисов для каждого элемента папки
    const promises = folderEntries.map(async (entry) => {
        // Проверяем, является ли элемент папкой
        if (entry.type === 'dir') {
            // Если это папка, рекурсивно загружаем её содержимое
            await traverseFolder(entry as MyFolder, parentDirId, formData)
        }
        // Если это файл, добавляем его к отправляемым данным
        formData.append('file', entry)
    })

    // Ждем завершения всех промисов
    await Promise.all(promises)
}
