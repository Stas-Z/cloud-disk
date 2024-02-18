import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'

import cls from './UserFilesListHeader.module.scss'

interface UserFilesListHeaderProps {
    className?: string
}

export const UserFilesListHeader = memo((props: UserFilesListHeaderProps) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.createNewDirHeader, {}, [className])}>
            <Text title={t('Files')} bold />
        </div>
    )
})
