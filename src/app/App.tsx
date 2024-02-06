import { memo } from 'react'

import { Counter } from './Counter'

interface AppProps {
    className?: string
}

export const App = memo((props: AppProps) => {
    const { className } = props

    return (
        <div className="app">
            <Counter />
        </div>
    )
})

App.displayName = 'App'
