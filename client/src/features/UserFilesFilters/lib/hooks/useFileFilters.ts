import { useCallback } from 'react'

import { useSelector } from 'react-redux'

import { FileSortFiled, FileView, fetchFilesList } from '@/entities/File'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

import {
    getFileFiltersSearch,
    getFileFiltersSort,
    getFileFiltersView,
} from '../../model/selectors/userFilesFiltersSelectors'
import { userFilesFiltersActions } from '../../model/slices/userFilesFiltersSlice'

export function useFileFilters() {
    const sort = useSelector(getFileFiltersSort)
    const search = useSelector(getFileFiltersSearch)
    const view = useSelector(getFileFiltersView)

    const dispatch = useAppDispatch()

    const fetchData = useCallback(
        async (sortValue?: FileSortFiled) => {
            dispatch(fetchFilesList({ replace: true, search, sort: sortValue })) // Запрос на сервер при сортировке или поиске
        },
        [dispatch, search],
    )

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
        (view: FileView) => {
            dispatch(userFilesFiltersActions.setView(view))
        },
        [dispatch],
    )
    const onChangeSort = useCallback(
        async (newSort: FileSortFiled) => {
            dispatch(userFilesFiltersActions.setSort(newSort))
            await fetchData(newSort)
        },
        [dispatch, fetchData],
    )
    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(userFilesFiltersActions.setSearch(search))
            debouncedFetchData()
        },
        [dispatch, debouncedFetchData],
    )

    const onBlurSearch = useCallback(async () => {
        dispatch(userFilesFiltersActions.setSearch(''))
        dispatch(fetchFilesList({ replace: true }))
    }, [dispatch])

    return {
        sort,
        search,
        view,
        onChangeView,
        onChangeSort,
        onChangeSearch,
        onBlurSearch,
    }
}
