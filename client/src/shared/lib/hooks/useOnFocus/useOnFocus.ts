import { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'

interface UseFocusBind {
    onBlur: () => void
    onFocus: () => void
}

type UseFocusResult = [boolean, UseFocusBind]

export const useOnFocus = (): UseFocusResult => {
    const [isFocus, setIsFocus] = useState(false)

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

    const onFocus = useCallback(() => {
        setIsFocus(true)
        clearTimeout(timerRef.current)
    }, [])

    const onBlur = useCallback(() => {
        timerRef.current = setTimeout(() => {
            setIsFocus(false)
        }, 100)
    }, [])

    return useMemo(
        () => [isFocus, { onFocus, onBlur }],
        [isFocus, onFocus, onBlur],
    )
}
