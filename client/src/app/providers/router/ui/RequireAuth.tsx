import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from '@/entities/User'
import { getRouteLogin } from '@/shared/const/router'

interface RequireAuthProps {
    children: JSX.Element
}

export function RequireAuth(props: RequireAuthProps) {
    const { children } = props
    const auth = useSelector(getUserAuthData)
    const location = useLocation()

    if (!auth) {
        return (
            <Navigate to={getRouteLogin()} state={{ from: location }} replace />
        )
    }

    return children
}
