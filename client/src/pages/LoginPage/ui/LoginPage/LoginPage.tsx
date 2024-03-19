import { Suspense, memo } from 'react'

import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from '@/entities/User'
import { getRouteFiles } from '@/shared/const/router'
import { LoginModal } from '@/widgets/LoginModal'

interface LoginPageProps {
    className?: string
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props

    const location = useLocation()

    const authData = useSelector(getUserAuthData)

    if (authData) {
        return (
            <Navigate to={getRouteFiles()} state={{ from: location }} replace />
        )
    }

    return (
        <Suspense fallback="">
            <LoginModal className={className} />
        </Suspense>
    )
}
export default memo(LoginPage)
