import { DragEvent, memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Overlay } from '@/shared/ui/Overlay'

import cls from './DragAndDrop.module.scss'

interface DragAndDropProps {
    className?: string
    onDragEnter?: (e: DragEvent<HTMLDivElement>) => void
    onDragLeave?: (e: DragEvent<HTMLDivElement>) => void
    onDragOver?: (e: DragEvent<HTMLDivElement>) => void
    onDrop?: (e: DragEvent<HTMLDivElement>) => void
}

export const DragAndDrop = memo((props: DragAndDropProps) => {
    const { className, onDragEnter, onDragLeave, onDragOver, onDrop } = props
    const { t } = useTranslation()

    return (
        <>
            <Overlay />
            <div
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={onDrop}
                className={classNames(cls.dragAndDrop, {}, [className])}
            >
                <h2 className={cls.title}>{t('Upload files to Cloud Disk')}</h2>
            </div>
        </>
    )
})
