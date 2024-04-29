import { memo } from 'react'

import AppSvg from '@/shared/assets/icons/cloud-logo.svg'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './AppLogo.module.scss'
import { HStack } from '../Stack'

interface AppLogoProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Ширина.
     */
    width?: number
    /**
     * @description Высота.
     */
    height?: number
    /**
     * @description Цвет.
     */
    color?: string
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className, width = 50, height = 50, color = 'black' } = props

    return (
        <HStack className={classNames(cls.appLogoWrapper, {}, [className])}>
            <AppSvg
                width={width}
                height={height}
                color={color}
                className={cls.appLogo}
            />
        </HStack>
    )
})
