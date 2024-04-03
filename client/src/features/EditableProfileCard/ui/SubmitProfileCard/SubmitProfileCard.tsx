import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'

import { getProfileisEditing } from '../../model/selectors/getProfileData'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slices/profileSlice'

interface SubmitProfileCardProps {
    className?: string
}

export const SubmitProfileCard = memo((props: SubmitProfileCardProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const isEditing = useSelector(getProfileisEditing)

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return (
        <HStack gap="16" className={classNames('', {}, [className])}>
            <Button
                variant="outline"
                color="save"
                disabled={!isEditing}
                onClick={onSave}
            >
                {t('Save changes')}
            </Button>
            <Button
                variant="outline"
                color="cancel"
                disabled={!isEditing}
                onClick={onCancelEdit}
            >
                {t('Cancel changes')}
            </Button>
        </HStack>
    )
})
