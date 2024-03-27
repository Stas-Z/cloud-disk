import { createContext } from 'react'

import { Canceler } from 'axios'

export interface CancelTokensContextProps {
    cancelTokens: { [key: string]: Canceler }
    addCancelToken: (fileId: string, cancel: Canceler) => void
    removeCancelToken: (fileId: string) => void
}

export const CancelTokensContext = createContext<CancelTokensContextProps>({
    cancelTokens: {},
    addCancelToken: () => {},
    removeCancelToken: () => {},
})
