import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Text.module.scss'

export type TextVariant =
    | 'primary'
    | 'error'
    | 'accent'
    | 'grey'
    | 'white'
    | 'succes'

export type TextAlign = 'right' | 'left' | 'center'

export type TextSize = 's' | 'm' | 'l'

interface TextProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Текст заголовка.
     */
    title?: string
    /**
     * @description Основной текст.
     */
    text?: string
    /**
     * @description Вариант текста. Меняет цвет текста.
     * @default 'primary'
     */
    variant?: TextVariant
    /**
     * @description Выравнивание текста.
     * @default 'left'
     */
    align?: TextAlign
    /**
     * @description Размер текста.
     * @default 'm'
     */
    size?: TextSize
    /**
     * @description Font-weight свойство css.
     */
    bold?: boolean
}

type HeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
}
const mapSizeToClass: Record<TextSize, string> = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClasses = [
        className,
        cls[variant],
        cls[align],
        cls[sizeClass],
    ]

    return (
        <div
            className={classNames(
                cls.text,
                { [cls.bold]: bold },
                additionalClasses,
            )}
        >
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    )
})
