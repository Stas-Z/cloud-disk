import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { Page } from '@/widgets/Page'

const ForbiddenPage = () => {
    const { t } = useTranslation()
    return <Page>{t('You do not have permission to this page')}</Page>
}
export default memo(ForbiddenPage)
