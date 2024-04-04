import { DragEvent, useState } from 'react'

import { useCancelTokens } from '@/shared/lib/hooks/useCancelTokens/useCancelTokens'

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch'
import { uploadDragFiles } from '../uploadDragFiles/uploadDragFiles'

interface useDragProps {
    currentDir: string
    userSpace: number
}

export function useDrag(props: useDragProps) {
    const { currentDir, userSpace } = props
    const dispatch = useAppDispatch()
    const [dragEnter, setDragEnter] = useState(false)
    const { addCancelToken } = useCancelTokens()

    const dragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(true)
    }
    const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragEnter(false)
    }

    const dropHandler = async (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const { items } = e.dataTransfer
        uploadDragFiles(dispatch, items, currentDir, addCancelToken, userSpace)
        setDragEnter(false)
    }

    return {
        dragEnterHandler,
        dragLeaveHandler,
        dropHandler,
        dragEnter,
    }
}
