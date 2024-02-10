import { memo, useCallback, useState } from 'react'

import { LoginModal } from '@/features/AuthorizationForm'
import { ContentLayout } from '@/shared/layouts/ContentLayout'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Navbar } from '@/widgets/Navbar'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props
    const [isAuthModal, setIsAuthModal] = useState(false)
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])
    const authData = false

    if (authData) {
        return (
            <div id="app" className={classNames('app', {}, [])}>
                <Navbar />
                <ContentLayout
                    sidebar={<div>sidebar</div>}
                    content={<div>content</div>}
                />
            </div>
        )
    }
    return <LoginModal isOpen onClose={onCloseModal} />
})

App.displayName = 'App'
