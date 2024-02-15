import { Suspense, memo } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { getUserAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthorizationForm'
import { getRouteFiles } from '@/shared/const/router'

interface LoginPageProps {
    className?: string
}

const LoginPage = (props: LoginPageProps) => {
    const { className } = props
    const { t } = useTranslation()

    const location = useLocation()

    const authData = useSelector(getUserAuthData)

    if (authData) {
        return (
            <Navigate to={getRouteFiles()} state={{ from: location }} replace />
        )
    }

    return (
        <Suspense fallback="">
            <LoginModal />
        </Suspense>
    )
}
export default memo(LoginPage)
