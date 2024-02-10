import {
    Reducer,
    ReducersMapObject,
    UnknownAction,
    combineReducers,
} from '@reduxjs/toolkit'

import { ReducerManager, StateSchema, StateSchemaKey } from './StateSchema'

export function createReducerManager(
    initialReducers: ReducersMapObject<StateSchema>,
): ReducerManager {
    const reducers = { ...initialReducers }

    let combinedReducer = combineReducers(reducers) // Комбинирует редьюсеры

    let keysToRemove: StateSchemaKey[] = [] // Редьюсеры которые мы хотим удалить

    return <ReducerManager>{
        getReducerMap: () => reducers,
        // По ключу удаляем редьюсер
        reduce: (state: StateSchema, action: UnknownAction) => {
            if (keysToRemove.length > 0 && state) {
                state = { ...state }
                keysToRemove.forEach((key) => {
                    delete state?.[key]
                })
                keysToRemove = []
            }
            return combinedReducer(state, action)
        },
        // По ключу добавляет редьюсер
        add: (key: StateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            reducers[key] = reducer
            combinedReducer = combineReducers(reducers)
        },

        remove: (key: StateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }
            delete reducers[key]
            keysToRemove.push(key)
            combinedReducer = combineReducers(reducers)
        },
    }
}
