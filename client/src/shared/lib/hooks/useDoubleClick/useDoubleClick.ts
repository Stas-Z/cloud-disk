import { useDebounce } from '../useDebounce/useDebounce'

export const useManyClickHandlers = (
    ...handlers: Array<(e: React.UIEvent<HTMLElement>) => void>
) => {
    const callEventHandler = (e: React.UIEvent<HTMLElement>) => {
        if (e.detail <= 0) return
        const handler = handlers[e.detail - 1]
        if (handler) {
            handler(e)
        }
    }

    const debounceHandler = useDebounce((e: React.UIEvent<HTMLElement>) => {
        callEventHandler(e)
    }, 250)

    return (e: React.UIEvent<HTMLElement>) => {
        e.persist()
        debounceHandler(e)
    }
}
