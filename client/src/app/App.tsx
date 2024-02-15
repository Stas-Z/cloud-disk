import { Suspense, memo, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { getUserAuthData, initAuthData } from '@/entities/User'
import { ContentLayout } from '@/shared/layouts/ContentLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'

import { ErrorBoundary } from './providers/ErrorBoundary'
import AppRouter from './providers/router/ui/AppRouter'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initAuthData())
    }, [dispatch])
    const authData = useSelector(getUserAuthData)
    return (
        <div id="app" className={classNames('app', {}, [className])}>
            <Suspense fallback="">
                {authData && <Navbar />}
                <ContentLayout
                    switchOn={authData}
                    sidebar={<Sidebar />}
                    content={
                        <ErrorBoundary>
                            <AppRouter />
                        </ErrorBoundary>
                    }
                />
            </Suspense>
        </div>
    )
})

App.displayName = 'App'
