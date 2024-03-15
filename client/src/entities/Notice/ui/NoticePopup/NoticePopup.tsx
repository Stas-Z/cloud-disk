import { memo, useCallback, useEffect, useState } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Text } from '@/shared/ui/Text'

import cls from './NoticePopup.module.scss'

interface NoticePopupProps {
    className?: string
    error?: string
    message: string
}

export const NoticePopup = memo((props: NoticePopupProps) => {
    const { className, error, message } = props

    const showNotice = Boolean(message) || Boolean(error)

    const [showPopupNotice, setshowPopupNotice] = useState(true)

    const onClose = useCallback(() => {
        setshowPopupNotice(false)
    }, [])

    const { close, isMounted } = useModal({
        animationDelay: 5000,
        isOpen: showNotice,
        onClose,
    })

    useEffect(() => {
        setshowPopupNotice(true)
        if (showNotice) {
            close()
        }
    }, [close, showNotice])

    const mods: Mods = {
        [cls.show]: showPopupNotice,
    }

    if (!isMounted) {
        return null
    }

    if (error) {
        return (
            <div className={classNames(cls.noticePopup, mods, [className])}>
                <Text text={error} size="s" variant="error" />
            </div>
        )
    }

    return (
        <div className={classNames(cls.noticePopup, mods, [className])}>
            <Text text={message} size="s" variant="accent" />
        </div>
    )
})
