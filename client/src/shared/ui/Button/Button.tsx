import {
    ButtonHTMLAttributes,
    ForwardedRef,
    ReactNode,
    forwardRef,
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Button.module.scss'

export type ButtonVariant = 'clear' | 'outline' | 'filled'

export type ButtonColor =
    | 'normal'
    | 'save'
    | 'cancel'
    | 'yellow'
    | 'transaprent'

export type ButtonSize = 'm' | 'l' | 'xl'

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
     * <Input addonLeft={<Icon Svg={SearchIcon} />} />
     */
    addonLeft?: ReactNode
    /**
     * Content to render on the right side of input
     * @example
     * <Input addonRight={<Icon Svg={SearchIcon} />} />
     */
    addonRight?: ReactNode
    /**
     * @description Button color.
     */
    color?: ButtonColor
    /**
     * @description Button shadow.
     */
    shadow?: boolean
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            square,
            size = 'm',
            disabled,
            fullWidth,
            addonLeft,
            addonRight,
            shadow,
            color = 'normal',
            ...otherProps
        } = props

        const mods: Mods = {
            [cls.square]: square,
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
            [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
            [cls.shadow]: shadow,
        }
        const addClass = [className, cls[variant], cls[size], cls[color]]

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
