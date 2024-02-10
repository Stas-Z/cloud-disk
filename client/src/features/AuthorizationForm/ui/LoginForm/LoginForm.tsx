import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AppLogo } from '@/shared/ui/AppLogo'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { VStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import cls from './LoginForm.module.scss'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { regByEmail } from '../../model/services/regByEmail/regByEmail'
import { regActions, regReducer } from '../../model/slice/regSlice'

export interface LoginFormProps {
    className?: string
    isOpen?: boolean
    onSuccess?: () => void
}

const initialReducers: ReducersList = {
    authForm: regReducer,
}

const LoginForm = (props: LoginFormProps) => {
    const { t } = useTranslation()
    const { className, isOpen, onSuccess } = props

    const dispatch = useAppDispatch()
    const { email, password, isLoading, error, succes } =
        useSelector(getLoginState)

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(regActions.setUsername(value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(regActions.setPassword(value))
        },
        [dispatch],
    )

    const onLoginClick = useCallback(async () => {
        await dispatch(regByEmail({ password, email }))
    }, [dispatch, password, email])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack
                gap="16"
                align="center"
                className={classNames(cls.loginForm, {}, [className])}
            >
                <VStack gap="8" max align="center">
                    <AppLogo width={100} height={49} />
                    <Text title={t('Registration')} size="m" />
                </VStack>
                {error && (
                    <Text
                        text={t('Incorrect password or email')}
                        variant="error"
                    />
                )}
                {succes && (
                    <Text
                        text={t('Profile created successfully')}
                        variant="accent"
                    />
                )}
                <VStack gap="8" max>
                    <Input
                        autoFocus
                        type="text"
                        className={cls.input}
                        placeholder={t('Enter your email')}
                        size="l"
                        onChange={onChangeEmail}
                        value={email}
                    />
                    <Input
                        type="password"
                        className={cls.input}
                        placeholder={t('Password')}
                        size="l"
                        onChange={onChangePassword}
                        value={password}
                    />
                </VStack>

                <Button
                    onClick={onLoginClick}
                    variant="filled"
                    color="yellow"
                    className={cls.loginBtn}
                    fullWidth
                    size="l"
                    disabled={isLoading}
                >
                    {t('Login')}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    )
}

export default memo(LoginForm)
