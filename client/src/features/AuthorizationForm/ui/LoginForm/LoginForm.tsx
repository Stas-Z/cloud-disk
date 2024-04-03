import { MutableRefObject, memo, useCallback, useEffect, useRef } from 'react'

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
import { AuthType } from '../../model/consts/authConsts'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { authByEmail } from '../../model/services/authByEmail/authByEmail'
import { regByEmail } from '../../model/services/regByEmail/regByEmail'
import { regActions, regReducer } from '../../model/slice/regSlice'
import { AuthTypeTabs } from '../AuthTypeTabs/AuthTypeTabs'

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    authForm: regReducer,
}

const LoginForm = (props: LoginFormProps) => {
    const { t } = useTranslation()
    const { className } = props

    const dispatch = useAppDispatch()

    const { email, password, isLoading, error, succes, view } =
        useSelector(getLoginState)

    const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

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

    const onButtonClickHandler = useCallback(async () => {
        if (view === AuthType.REG) {
            const result = await dispatch(regByEmail({ password, email }))
            if (result.meta.requestStatus === 'fulfilled') {
                timerRef.current = setTimeout(() => {
                    dispatch(authByEmail({ password, email }))
                }, 1000)
            }
        }
        if (view === AuthType.AUTH) {
            await dispatch(authByEmail({ password, email }))
        }
    }, [view, dispatch, password, email])

    const onChangeHandler = (view: AuthType) => {
        dispatch(regActions.setView(view))
    }

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onButtonClickHandler()
            }
        },
        [onButtonClickHandler],
    )
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [onKeyDown])

    const errorMessage = <Text text={t(error as string)} variant="error" />
    const succesMessage = <Text text={t(succes as string)} variant="accent" />
    const buttonText = view === AuthType.AUTH ? t('Sign in') : t('Sign up')

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack
                gap="16"
                align="center"
                className={classNames(cls.loginForm, {}, [className])}
            >
                <VStack gap="16" max align="center">
                    <AppLogo width={100} height={49} />

                    <AuthTypeTabs value={view} onChangeType={onChangeHandler} />
                </VStack>
                {error && errorMessage}
                {succes && succesMessage}
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
                    onClick={onButtonClickHandler}
                    variant="filled"
                    color="yellow"
                    className={cls.loginBtn}
                    fullWidth
                    size="l"
                    disabled={isLoading}
                    shadow
                    round
                >
                    {buttonText}
                </Button>
            </VStack>
        </DynamicModuleLoader>
    )
}

export default memo(LoginForm)
