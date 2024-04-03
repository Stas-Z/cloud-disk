export enum AppRoutes {
    LOGIN = 'login',
    FILES = 'files',
    PROFILE = 'profile',
    FORBIDDEN = 'forbidden',

    NOT_FOUND = 'not_found',
}

export const getRouteLogin = () => '/'
export const getRouteFiles = () => '/files'
export const getRouteProfile = () => '/profile'
export const getRouteForbidden = () => '/forbidden'
