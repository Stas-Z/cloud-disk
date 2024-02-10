import { memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Text.module.scss'

export type TextVariant = 'primary' | 'error' | 'accent'

export type TextAlign = 'right' | 'left' | 'center'

export type TextSize = 's' | 'm' | 'l'

interface TextProps {
    /**
     * @description additional class.
     */
    className?: string
    /**
     * @description The text of the title
     */
    title?: string
    /**
     * @description The text to display
     */
    text?: string
    /**
     * @description The variant of the text. Changes the color
     * @default 'primary'
     */
    variant?: TextVariant
    /**
     * @description The text alignment
     * @default 'left'
     */
    align?: TextAlign
    /**
     * @description The size of the text
     * @default 'm'
     */
    size?: TextSize
    /**
     * @description font-weight: bold;
     */
    bold?: boolean

    'data-testid'?: string
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
        'data-testid': dataTestId = 'Text',
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
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    )
})
