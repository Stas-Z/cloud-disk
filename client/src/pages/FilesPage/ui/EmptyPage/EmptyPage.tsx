import { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { UploadFiles } from '@/features/UploadFiles'
import FileIcon from '@/shared/assets/icons/all-files.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon } from '@/shared/ui/Icon'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './EmptyPage.module.scss'

interface EmptyPageProps {
    className?: string
    search?: string
}

export const EmptyPage = memo((props: EmptyPageProps) => {
    const { className, search } = props
    const { t } = useTranslation()

    if (search) {
        return (
            <div className={classNames(cls.noFiles, {}, [className])}>
                <Text
                    bold
                    title={t(
                        'No files or folders were found in your Disk for the request',
                        { search },
                    )}
                    align="center"
                />
            </div>
        )
    }

    return (
        <VStack
            className={classNames(cls.emptyPage, {}, [className])}
            align="center"
            justify="center"
            gap="24"
        >
            <Icon Svg={FileIcon} height={80} width={96} />
            <VStack className={cls.infoWraper} align="center" gap="16">
                <Text title={t('All files')} align="center" bold />
                <Text text={t('Upload your files')} align="center" />
                <UploadFiles className={cls.upload} emptyPage />
            </VStack>
        </VStack>
    )
})
