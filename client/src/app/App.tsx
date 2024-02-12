import { Suspense, memo, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { getUserAuthData, initAuthData } from '@/entities/User'
import { LoginModal } from '@/features/AuthorizationForm'
import { ContentLayout } from '@/shared/layouts/ContentLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Navbar } from '@/widgets/Navbar'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props
    const dispatch = useAppDispatch()
    const authData = useSelector(getUserAuthData)

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])

    if (authData) {
        return (
            <div id="app" className={classNames('app', {}, [])}>
                <Suspense fallback="">
                    <Navbar />
                    <ContentLayout
                        sidebar={<div>sidebar</div>}
                        content={<div>content</div>}
                    />
                </Suspense>
            </div>
        )
    }
    return (
        <Suspense fallback="">
            <LoginModal />
        </Suspense>
    )
})

App.displayName = 'App'
