import { ReactNode, useContext, useMemo, useRef } from 'react'

import { Canceler } from 'axios'

import { CancelTokensContext } from '../../context/CancelTokensContext'

interface CancelTokensProviderProps {
    children: ReactNode
}

const CancelTokensProvider = (props: CancelTokensProviderProps) => {
    const { children } = props

    const cancelTokensRef = useRef<{ [key: string]: Canceler }>({})

    const addCancelToken = (fileId: string, cancel: Canceler) => {
        cancelTokensRef.current[fileId] = cancel
    }

    const removeCancelToken = (fileId: string) => {
        delete cancelTokensRef.current[fileId]
    }

    const contextValue = useMemo(
        () => ({
            cancelTokens: cancelTokensRef.current,
            addCancelToken,
            removeCancelToken,
        }),
        [],
    )

    return (
        <CancelTokensContext.Provider value={contextValue}>
            {children}
        </CancelTokensContext.Provider>
    )
}

export const useCancelTokens = () => useContext(CancelTokensContext)

export default CancelTokensProvider
