import { useState, useCallback } from 'react'

const useResetInput = () => {
    const [resetFileInput, setResetFileInput] = useState(false)

    const onResetInput = useCallback(() => {
        setResetFileInput(true)
        setTimeout(() => {
            setResetFileInput(false)
        }, 0)
    }, [])

    return { resetFileInput, onResetInput }
}

export default useResetInput
