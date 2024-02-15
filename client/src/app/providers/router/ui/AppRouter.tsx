import { Suspense, memo } from 'react'

import { Route, Routes } from 'react-router-dom'

import { AppRoutesProps } from '@/shared/types/router'

import { RequireAuth } from './RequireAuth'
import { routeConfig } from '../config/routeConfig'

const renderWithWrapper = (route: AppRoutesProps) => {
    const element = <Suspense fallback="">{route.element}</Suspense>

    return (
        <Route
            key={route.path}
            path={route.path}
            element={
                route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
            }
        />
    )
}

const AppRouter = () => (
    <Suspense fallback="">
        <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
)

export default memo(AppRouter)
