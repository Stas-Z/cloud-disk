import { FilesPage } from '@/pages/FilesPage'
import { ForbiddenPage } from '@/pages/ForbiddenPage'
import { LoginPage } from '@/pages/LoginPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import {
    AppRoutes,
    getRouteFiles,
    getRouteFilesDetails,
    getRouteForbidden,
    getRouteLogin,
} from '@/shared/const/router'
import { AppRoutesProps } from '@/shared/types/router'

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.FILES]: {
        path: getRouteFiles(),
        element: <FilesPage />,
        authOnly: true,
    },
    [AppRoutes.FILE_DETAILS]: {
        path: getRouteFilesDetails(':id'),
        element: <FilesPage />,
        authOnly: true,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />, // последний
    },
}
