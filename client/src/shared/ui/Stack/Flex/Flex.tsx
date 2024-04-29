import { CSSProperties, ElementType, useMemo } from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import { PolymorphicComponentProp } from '@/shared/types/polymorphic'

import cls from './Flex.module.scss'

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around'
export type FlexAlign = 'start' | 'center' | 'end' | 'unset'
export type FlexDirection = 'row' | 'column'
export type FlexWrap = 'nowrap' | 'wrap'
export type FlexGap = '4' | '8' | '16' | '24' | '32'
export type FlexPosition =
    | 'absolute'
    | 'fixed'
    | 'relative'
    | 'static'
    | 'sticky'
    | 'inherit'

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
    around: cls.justifyAround,
}

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
    unset: cls.alignUnset,
}

const directionClasses: Record<FlexDirection, string> = {
    column: cls.directionColumn,
    row: cls.directionRow,
}

const gapClasses: Record<FlexGap, string> = {
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    24: cls.gap24,
    32: cls.gap32,
}
const positionClasses: Record<FlexPosition, string> = {
    absolute: cls.absolute,
    fixed: cls.fixed,
    relative: cls.relative,
    static: cls.static,
    sticky: cls.sticky,
    inherit: cls.inherit,
}

export interface FlexProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Justify content свойство css.
     */
    justify?: FlexJustify
    /**
     * @description Align items свойство css.
     */
    align?: FlexAlign
    /**
     * @description Flex direction свойство css.
     */
    direction?: FlexDirection
    /**
     * @description Gap между flex items.
     */
    gap?: FlexGap
    /**
     * @description Position свойство css.
     */
    position?: FlexPosition
    /**
     * @description Флаг, чтобы установить ширину 100%.
     */
    max?: boolean
    /**
     * @description Флаг, чтобы установить высоту 100%.
     */
    maxHeight?: boolean
    /**
     * @description Flex-wrap свойство css.
     * @default 'nowrap'
     */
    wrap?: FlexWrap
    /**
     * @description Флаг, чтобы установить inline-flex.
     * @default 'false'
     */
    inline?: boolean
    /**
     * @description Flex-grow свойство css.
     */
    flexGrow?: number
}

export const defaultFlexTag = 'div'

export const Flex = <E extends ElementType = typeof defaultFlexTag>(
    props: PolymorphicComponentProp<E, FlexProps>,
) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap,
        position,
        max,
        maxHeight,
        wrap = 'nowrap',
        as,
        inline = false,
        flexGrow,
        ...otherProps
    } = props

    const classes = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        cls[wrap],
        gap && gapClasses[gap],
        position && positionClasses[position],
    ]

    const mods: Mods = {
        [cls.max]: max,
        [cls.maxHeight]: maxHeight,
        [cls.inline]: inline,
    }
    const Tag = as ?? defaultFlexTag
    const styles = useMemo<CSSProperties>(
        () => ({
            flexGrow,
        }),
        [flexGrow],
    )

    return (
        <Tag
            className={classNames(cls.flex, mods, classes)}
            {...otherProps}
            style={styles}
        >
            {children}
        </Tag>
    )
}
