import { DragEvent, useState } from 'react'

import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch'
import { uploadDragFiles } from '../uploadDragFiles/uploadDragFiles'

interface useDragProps {
    currentDir: string
}

export function useDrag(props: useDragProps) {
    const { currentDir } = props
    const dispatch = useAppDispatch()
    const [dragEnter, setDragEnter] = useState(false)

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

    const dropHandler = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const { items } = e.dataTransfer
        uploadDragFiles(dispatch, items, currentDir)
        setDragEnter(false)
    }

    return {
        dragEnterHandler,
        dragLeaveHandler,
        dropHandler,
        dragEnter,
    }
}
