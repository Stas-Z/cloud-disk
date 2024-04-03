import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import Close from '@/shared/assets/icons/close.svg'
import Info from '@/shared/assets/icons/info-icon.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useHover } from '@/shared/lib/hooks/useHover/useHover'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button'
import { Divider } from '@/shared/ui/Divider'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { Label } from '@/shared/ui/Label'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './ProfileCard.module.scss'
import { User } from '../../model/types/userSchema'

interface ProfileCardProps {
    className?: string
    data?: User
    isLoading?: boolean
    error?: string
    onChangeUsername?: (value?: string) => void
    onChangeEmail?: (value?: string) => void
    onChangeAvatar?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onDeleteAvatar?: () => void
    resetFileInput?: boolean
}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        onChangeAvatar,
        onDeleteAvatar,
        onChangeUsername,
        onChangeEmail,
        resetFileInput,
    } = props
    const { t } = useTranslation()

    const errorMessage = <Text text={t(error || '')} variant="error" />

    const openFilePicker = useCallback(() => {
        document.getElementById('avatar')?.click()
    }, [])

    const [isHover, bindHover] = useHover()

    const avatar = data?.avatar ? `${__STATIC__}/${data.id}/${data.avatar}` : ''

    return (
        <VStack className={classNames(cls.profileCard, {}, [className])} max>
            <Text title={t('Account details')} className={cls.title} />
            <div className={cls.avatarContent}>
                <Label htmlFor="avatar" className={cls.label}>
                    {t('Avatar')}
                </Label>
                <HStack position="relative">
                    <Avatar
                        src={avatar}
                        size={48}
                        className={cls.avatar}
                        {...bindHover}
                    />
                    {onDeleteAvatar && isHover && (
                        <HStack className={cls.close} {...bindHover}>
                            <Icon
                                Svg={Close}
                                clickable
                                onClick={onDeleteAvatar}
                            />
                        </HStack>
                    )}
                    <div>
                        <Button
                            className={cls.uploadButton}
                            variant="outline"
                            color="accent"
                            onClick={openFilePicker}
                            size="s"
                        >
                            {t('Choose file')}
                        </Button>
                        <input
                            accept="image/*"
                            onChange={onChangeAvatar}
                            type="file"
                            id="avatar"
                            style={{ display: 'none' }}
                            name="avatar"
                            key={resetFileInput ? 'reset' : 'default'}
                        />
                        <HStack max gap="16">
                            <Icon Svg={Info} />
                            <Text size="s" text={t('Ideal dimensions')} />
                        </HStack>
                    </div>
                </HStack>
            </div>
            <Divider />
            <VStack gap="24" max className={cls.accountDetails}>
                <div className={cls.usernameContent}>
                    <Label htmlFor="name" className={cls.label}>
                        {t('Full name')}
                    </Label>
                    <Input
                        variant="outlined"
                        size="l"
                        value={data?.username || ''}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className={cls.emailContent}>
                    <Label htmlFor="email" className={cls.label}>
                        {t('Email address')}
                    </Label>
                    {error && errorMessage}
                    <Input
                        variant="outlined"
                        size="l"
                        value={data?.email || ''}
                        onChange={onChangeEmail}
                        type="email"
                    />
                </div>
            </VStack>
        </VStack>
    )
})
