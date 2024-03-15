import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { filesAdapter } from '../../slices/fileSlice'
import { FileSchema } from '../../types/fileSchema'

// Создаем базовый селектор для получения состояния файлов
const selectUserFilesState = (state: StateSchema) =>
    state.file || filesAdapter.getInitialState()

// Создаем мемоизированный селектор для получения всех файлов
export const getAllFiles = createSelector(
    [selectUserFilesState],
    (fileState: FileSchema) => {
        const allFiles = filesAdapter.getSelectors().selectAll(fileState)
        // Сортируем файлы по типу (папки перед файлами)
        const sortedFiles = [...allFiles].sort((a, b) => {
            // Получаем типы файлов или устанавливаем пустую строку, если тип не определен
            const typeA = a.type || ''
            const typeB = b.type || ''

            // Если оба элемента - папки или файлы, сортируем их по имени
            if (
                (typeA === 'dir' || typeA === '') &&
                (typeB === 'dir' || typeB === '')
            ) {
                return a.name.localeCompare(b.name)
            }
            // Если первый элемент - папка, он должен быть первым в списке
            if (typeA === 'dir' || typeA === '') {
                return -1
            }
            // Если второй элемент - папка, он должен быть первым в списке
            return 1
        })
        return sortedFiles
    },
)
