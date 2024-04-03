import { memo, useCallback, useEffect } from 'react'

import { useSelector } from 'react-redux'

import { ProfileCard } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import useResetInput from '@/shared/lib/hooks/useResetInput/useResetInput'
import { VStack } from '@/shared/ui/Stack'

import cls from './EditableProfileCard.module.scss'
import {
    getProfileError,
    getProfileForm,
} from '../../model/selectors/getProfileData'
import { deleteAvatar } from '../../model/services/deleteAvatar/deleteAvatar'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { uploadAvatar } from '../../model/services/uploadAvatar/uploadAvatar'
import { profileActions, profileReducer } from '../../model/slices/profileSlice'
import { SubmitProfileCard } from '../SubmitProfileCard/SubmitProfileCard'

interface EditableProfileCardProps {
    className?: string
}

const initialReducers: ReducersList = {
    profile: profileReducer,
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className } = props
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    const formData = useSelector(getProfileForm)
    const error = useSelector(getProfileError)

    const { resetFileInput, onResetInput } = useResetInput()

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || '' }))
        },
        [dispatch],
    )
    const onChangeEmail = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ email: value || '' }))
        },
        [dispatch],
    )
    const onChangeAvatar = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target
            if (files) {
                dispatch(uploadAvatar(files[0]))
            }
            onResetInput()
        },
        [dispatch, onResetInput],
    )
    const onDeleteAvatar = useCallback(() => {
        dispatch(deleteAvatar())
    }, [dispatch])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <VStack
                gap="24"
                className={classNames(cls.editableProfileCard, {}, [className])}
            >
                <ProfileCard
                    data={formData}
                    error={error}
                    onChangeUsername={onChangeUsername}
                    onChangeEmail={onChangeEmail}
                    onChangeAvatar={onChangeAvatar}
                    onDeleteAvatar={onDeleteAvatar}
                    resetFileInput={resetFileInput}
                />
                <SubmitProfileCard />
            </VStack>
        </DynamicModuleLoader>
    )
})
