import {
    ButtonHTMLAttributes,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'
export type ButtonTextColor = 'normalText' | 'whiteText'

export type ButtonColor =
    | 'normal'
    | 'save'
    | 'cancel'
    | 'yellow'
    | 'white'
    | 'transaprent'
    | 'accent'

export type ButtonSize = 's' | 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Вариант кнопки. Отвечает за цвет и границу кнопки.
     * @default 'outline'
     */
    variant?: ButtonVariant
    /**
     * @description Флаг, чтобы сделать кнопку квадратной.
     */
    square?: boolean
    /**
     * @description Флаг, чтобы сделать кнопку круглой.
     */
    round?: boolean
    /**
     * @description Размер кнопки. Отвечает за размер текста кнопки.
     * @default 'm'
     */
    size?: ButtonSize
    /**
     * @description Флаг для отключения кнопки.
     */
    disabled?: boolean
    /**
     * @description Содержимое кнопки.
     */
    children?: ReactNode
    /**
     * @description Флаг, чтобы сделать ширину кнопки равной 100%.
     */
    fullWidth?: boolean
    /**
     * @description Содержимое для отображения в левой части кнопки.
     * @example
     * <Button addonLeft={<Icon Svg={SearchIcon} />} />
     */
    addonLeft?: ReactNode
    /**
     * @description Содержимое для отображения в правой части кнопки.
     * @example
     * <Button addonRight={<Icon Svg={SearchIcon} />} />
     */
    addonRight?: ReactNode
    /**
     * @description Цвет кнопки.
     */
    color?: ButtonColor
    /**
     * @description Цвет текста.
     */
    textColor?: ButtonTextColor
    /**
     * @description Флаг, чтобы отобразить тень кнопки.
     */
    shadow?: boolean
    /**
     * @description Флаг, чтобы отобразить стиль загрузки кнопки.
     */
    isLoading?: boolean
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            square,
            round,
            size = 'm',
            disabled,
            fullWidth,
            addonLeft,
            addonRight,
            shadow,
            isLoading,
            color = 'normal',
            textColor = 'normalText',
            ...otherProps
        } = props

        const mods: Mods = {
            [cls.square]: square,
            [cls.round]: round,
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
            [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
            [cls.shadow]: shadow,
            [cls.loading]: isLoading,
        }
        const addClass = [
            className,
            cls[variant],
            cls[size],
            cls[color],
            cls[textColor],
        ]

        return (
            <button
                type="button"
                disabled={disabled}
                className={classNames(cls.button, mods, addClass)}
                {...otherProps}
                ref={ref}
            >
                {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
                {children}
                {addonRight && (
                    <div className={cls.addonRight}>{addonRight}</div>
                )}
            </button>
        )
    },
)
