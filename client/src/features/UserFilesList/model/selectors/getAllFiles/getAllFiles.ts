import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

import { filesAdapter } from '../../slices/userFilesSlice'
import { UserFilesSchema } from '../../types/userFilesSchema'

// export const getAllFiles = filesAdapter.getSelectors<StateSchema>(
//     (state) => state.userFiles || filesAdapter.getInitialState(),
// )

// Создаем базовый селектор для получения состояния файлов
const selectUserFilesState = (state: StateSchema) =>
    state.userFiles || filesAdapter.getInitialState()

// Создаем мемоизированный селектор для получения всех файлов
export const getAllFiles = createSelector(
    selectUserFilesState,
    (userFilesState: UserFilesSchema) =>
        filesAdapter.getSelectors().selectAll(userFilesState),
)
