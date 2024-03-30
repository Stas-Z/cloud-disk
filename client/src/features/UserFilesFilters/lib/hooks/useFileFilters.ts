import { useCallback } from 'react'

import { useSelector } from 'react-redux'

import { FileSortFiled, FileView, fetchFilesList } from '@/entities/File'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'

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

    const fetchData = useCallback(() => {
        dispatch(fetchFilesList({ replace: true, search, sort })) // Запрос на сервер при сортировке или поиске
    }, [dispatch, search, sort])

    // const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
        (view: FileView) => {
            dispatch(userFilesFiltersActions.setView(view))
        },
        [dispatch],
    )
    const onChangeSort = useCallback(
        (newSort: FileSortFiled) => {
            dispatch(userFilesFiltersActions.setSort(newSort))
            fetchData()
        },
        [dispatch, fetchData],
    )
    // const onChangeSearch = useCallback(
    //   (search: string) => {
    //     dispatch(articlesPageActions.setSearch(search))
    //     dispatch(articlesPageActions.setPage(1))
    //     debouncedFetchData()
    //   },
    //   [dispatch, debouncedFetchData],
    // )

    return {
        sort,
        search,
        view,
        onChangeView,
        onChangeSort,
    }
}
