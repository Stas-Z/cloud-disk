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
     * @description additional class.
     */
    className?: string
    /**
     * @description Button variant. Responsible for button's color and border.
     * @default 'outline'
     */
    variant?: ButtonVariant
    /**
     * @description Flag to make button squared.
     */
    square?: boolean
    /**
     * @description Flag to make border button round.
     */
    round?: boolean
    /**
     * @description Button size. Responsible for button's text size.
     * @default 'm'
     */
    size?: ButtonSize
    /**
     * @description Flag to disable button.
     */
    disabled?: boolean
    /**
     * @description Button content
     */
    children?: ReactNode
    /**
     * @description Flag to make button's width 100%.
     */
    fullWidth?: boolean
    /**
     * Content to render on the left side of input
     * @example
     * <Button addonLeft={<Icon Svg={SearchIcon} />} />
     */
    addonLeft?: ReactNode
    /**
     * Content to render on the right side of input
     * @example
     * <Button addonRight={<Icon Svg={SearchIcon} />} />
     */
    addonRight?: ReactNode
    /**
     * @description Button color.
     */
    color?: ButtonColor
    /**
     * @description Button color.
     */
    textColor?: ButtonTextColor
    /**
     * @description Button shadow.
     */
    shadow?: boolean
    /**
     * @description Style for loading button.
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
