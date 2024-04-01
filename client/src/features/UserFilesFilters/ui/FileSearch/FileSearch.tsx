import { memo, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import Close from '@/shared/assets/icons/close.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useOnFocus } from '@/shared/lib/hooks/useOnFocus/useOnFocus'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/Input'
import { HStack } from '@/shared/ui/Stack'

import cls from './FileSearch.module.scss'
import { useFileFilters } from '../../lib/hooks/useFileFilters'

interface FileSearchProps {
    className?: string
}

export const FileSearch = memo((props: FileSearchProps) => {
    const { className } = props
    const { t } = useTranslation()
    const { search, onChangeSearch, onBlurSearch } = useFileFilters()
    const [isFocused, focusBind] = useOnFocus()
    const onCancel = useCallback(() => {
        onBlurSearch()
    }, [onBlurSearch])

    return (
        <div
            className={classNames(
                cls.fileSearch,
                { [cls.focused]: isFocused },
                [className],
            )}
            {...focusBind}
        >
            {isFocused && (
                <HStack className={cls.close}>
                    <Icon Svg={Close} clickable onClick={onCancel} />
                </HStack>
            )}
            <Input
                placeholder={t('Search my Disk')}
                size="m"
                className={cls.search}
                onChange={onChangeSearch}
                value={search}
                variant="search"
                addonRight={
                    <Icon Svg={SearchIcon} className={cls.searchIcon} />
                }
            />
        </div>
    )
})
