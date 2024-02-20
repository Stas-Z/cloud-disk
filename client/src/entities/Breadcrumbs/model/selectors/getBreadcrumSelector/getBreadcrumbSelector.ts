import { createSelector } from '@reduxjs/toolkit'

import { StateSchema } from '@/app/providers/StoreProvider'

export const getBreadcrumbs = (state: StateSchema) =>
    state.breadcrumbs.breadcrumbs

export const getBreadcrumbsWithoutLast = createSelector(
    getBreadcrumbs,
    (breadcrumbs) => breadcrumbs.slice(0, -1),
)

export const getLastBreadcrumbName = createSelector(
    getBreadcrumbs,
    (breadcrumbs) => breadcrumbs[breadcrumbs.length - 1],
)
