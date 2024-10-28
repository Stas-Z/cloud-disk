import { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { sizeFormat } from '@/entities/File'
import { getUserDiskSpace, getUserUsedSpace } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'

import cls from './UsedSpaceBar.module.scss'

interface UsedSpaceBarProps {
    className?: string
}

export const UsedSpaceBar = memo((props: UsedSpaceBarProps) => {
    const { className } = props
    const { t } = useTranslation()
    const diskSpace = useSelector(getUserDiskSpace)
    const usedSpace = useSelector(getUserUsedSpace)

    const freeSpace = Math.round((usedSpace / diskSpace) * 100)

    const disk = sizeFormat(diskSpace)
    const used = sizeFormat(diskSpace - usedSpace)

    return (
        <div className={classNames(cls.usedSpaceBar, {}, [className])}>
            <div className={cls.infoSpaceContent}>
                <div className={cls.indicatorBar}>
                    <div
                        className={cls.indicatorValue}
                        style={{ width: `${freeSpace}%` }}
                    />
                </div>
                <div>
                    <Text
                        text={t('Free from', { used, disk })}
                        size="s"
                        align="center"
                    />
                </div>
            </div>
        </div>
    )
})
