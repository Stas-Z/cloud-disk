import { memo, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUserData, getUserFirstVisit, userActions } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Modal } from '@/shared/ui/Modal'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './FilePageGreeting.module.scss'

interface FilePageGreetingProps {
    className?: string
}

export const FilePageGreeting = memo((props: FilePageGreetingProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const firstVisit = useSelector(getUserFirstVisit)
    const userData = useSelector(getUserData)

    useEffect(() => {
        if (!firstVisit) {
            setIsOpen(true)
            dispatch(userActions.setUserVisit(userData?.id))
        }
    }, [dispatch, firstVisit, userData?.id])

    const onClose = () => setIsOpen(false)

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose} overlay>
            <VStack gap="16" align="center" className={cls.filePageGreeting}>
                <Text title={t('Welcome to Open Cloud Disk')} align="center" />
                <Text
                    text={t('This pet project is a cloud data storage')}
                    align="center"
                />
                <Text
                    text={t(
                        'All files you upload will be stored for only one day',
                    )}
                    variant="error"
                    align="center"
                />
            </VStack>
        </Modal>
    )
})
