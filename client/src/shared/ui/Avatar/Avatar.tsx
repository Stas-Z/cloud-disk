import { CSSProperties, useMemo } from 'react'

import UserIcon from '@/shared/assets/icons/avatar.svg'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Avatar.module.scss'
import { AppImage } from '../AppImage'
import { Icon } from '../Icon'
import { Skeleton } from '../Skeleton'

interface AvatarProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Источник изображения аватара.
     */
    src?: string
    /**
     * @description Ширина и высота аватара.
     */
    size?: number
    /**
     * @description Альтернативное текстовое описание изображения.
     */
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const { className, size = 100, src, alt, ...otherProps } = props

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    )

    const fallback = <Skeleton width={size} height={size} border="50%" />
    const errorFallback = <Icon height={size} width={size} Svg={UserIcon} />

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.avatar, {}, [className])}
            {...otherProps}
        />
    )
}
