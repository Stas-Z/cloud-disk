import { memo, useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Text } from '@/shared/ui/Text'

import cls from './NoticePopup.module.scss'
import {
    getNoticeError,
    getNoticeFileName,
    getNoticeMessage,
} from '../../model/selectors/noticeSelectors'
import { noticeActions } from '../../model/slices/noticeSlice'

interface NoticePopupProps {
    className?: string
}

export const NoticePopup = memo((props: NoticePopupProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const message = useSelector(getNoticeMessage)
    const error = useSelector(getNoticeError)
    const noticeFileName = useSelector(getNoticeFileName)

    const showNotice = Boolean(message) || Boolean(error)

    const [showPopupNotice, setshowPopupNotice] = useState(true)

    const onClose = useCallback(() => {
        setshowPopupNotice(false)
        dispatch(noticeActions.clearNotice())
    }, [dispatch])

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
        [cls.delete]: message,
    }

    if (!isMounted) {
        return null
    }

    if (error) {
        return (
            <div className={classNames(cls.noticePopup, mods, [className])}>
                <Text text={t(error)} size="s" variant="error" />
            </div>
        )
    }

    return (
        <div className={classNames(cls.noticePopup, mods, [className])}>
            <Text
                text={t(message, { file: noticeFileName })}
                size="s"
                variant={message ? 'white' : 'accent'}
                align="center"
            />
        </div>
    )
})
