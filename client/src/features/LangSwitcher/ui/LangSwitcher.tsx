import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'

interface LangSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
        document.documentElement.lang = i18n.language
    }

    return (
        <Button variant="clear" onClick={toggle}>
            {short ? t('lng') : t('Language')}
        </Button>
    )
})
