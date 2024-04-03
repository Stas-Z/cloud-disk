import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { EditableProfileCard } from '@/features/EditableProfileCard'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
    className?: string
}

const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props
    const { t } = useTranslation()

    return (
        <Page className={classNames(cls.profilePage, {}, [className])}>
            <EditableProfileCard />
        </Page>
    )
}

export default memo(ProfilePage)
