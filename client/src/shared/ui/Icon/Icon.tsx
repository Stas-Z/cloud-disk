import React, { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Icon.module.scss'

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Компонент иконки.
     */
    Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

interface NonClickableIconProps extends IconBaseProps {
    /**
     * @description компонент не кликабельный.
     */
    clickable?: false
}

interface ClickableIconProps extends IconBaseProps {
    /**
     * @description компонент кликабельный.
     */
    clickable?: true
    /**
     * @description Callback нажатия на компонент.
     */
    onClick: () => void
}

type IconProps = NonClickableIconProps | ClickableIconProps

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 16,
        height = 16,
        clickable,
        ...otherProps
    } = props

    const icon = (
        <Svg
            className={classNames(cls.icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    )

    if (clickable) {
        return (
            <button
                type="button"
                className={cls.button}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        )
    }

    return icon
})
