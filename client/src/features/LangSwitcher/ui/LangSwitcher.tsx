import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { Button, ButtonVariant } from '@/shared/ui/Button'

interface LangSwitcherProps {
    className?: string
    short?: boolean
    variant?: ButtonVariant
}

export const LangSwitcher = memo(
    ({ className, short, variant = 'clear' }: LangSwitcherProps) => {
        const { t, i18n } = useTranslation()

        const toggle = async () => {
            i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
            document.documentElement.lang = i18n.language
        }

        return (
            <Button variant={variant} onClick={toggle}>
                {short ? t('lng') : t('Language')}
            </Button>
        )
    },
)
