import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'

import cls from './PageError.module.scss'

interface PageErrorProps {
    className?: string
}

export const PageError = memo(({ className }: PageErrorProps) => {
    const { t } = useTranslation()

    const reloadPage = () => {
        window.location.reload()
    }

    return (
        <div className={classNames(cls.pageError, {}, [className])}>
            <p>{t('An error occurred')}</p>
            <Button onClick={reloadPage}>{t('Reload')}</Button>
        </div>
    )
})
