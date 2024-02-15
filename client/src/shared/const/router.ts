export enum AppRoutes {
    LOGIN = 'login',
    FILES = 'files',
    FILE_DETAILS = 'file_details',
    FORBIDDEN = 'forbidden',

    NOT_FOUND = 'not_found',
}

export const getRouteLogin = () => '/'
export const getRouteFiles = () => '/files'
export const getRouteFilesDetails = (id: string) => `/files/${id}`
export const getRouteForbidden = () => '/forbidden'
