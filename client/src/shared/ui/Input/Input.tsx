import React, {
    InputHTMLAttributes,
    MutableRefObject,
    ReactNode,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react'

import { Mods, classNames } from '@/shared/lib/classNames/classNames'

import cls from './Input.module.scss'
import { HStack } from '../Stack'
import { Text } from '../Text'

// Исключаем пропсы которые передаём вторым аргументом.
// Omit<'то что мы забераем','то что мы исключаем'>
type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>

type InputSize = 's' | 'm' | 'l'

// В InputHTMLAttributes уже есть value и onChange, поэтому их надо исключить через Omit.
// Omit позовляет из типа забрать все пропсы и исключить те, которые нам не нужны.

type VariantType = 'filled' | 'outlined' | 'search'

interface InputProps extends HTMLInputProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Значение в инпуте.
     */
    value?: string | number
    /**
     * @description Callback для изменения значения в инпуте.
     */
    onChange?: (value: string) => void
    /**
     * @description Флаг для отключения ввода и добавления класса readonly.
     */
    readonly?: boolean
    /**
     * @description Содержимое для отображения в левой части инпута.
     * @example
     * <Input addonLeft={<Icon Svg={SearchIcon} />} />
     */
    addonLeft?: ReactNode
    /**
     * @description Содержимое для отображения в правой части инпута.
     * @example
     * <Input addonRight={<Icon Svg={SearchIcon} />} />
     */
    addonRight?: ReactNode
    /**
     * @description Label для инпута.
     */
    label?: string
    /**
     * @description Высота инпута.
     */
    size?: InputSize
    /**
     * @description Вариант инпута. Отвечает за стили инпута.
     */
    variant?: VariantType
    /**
     * @description Флаг для включения фокусировки.
     */
    focus?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        readonly,
        addonLeft,
        addonRight,
        label,
        size = 'm',
        variant = 'filled',
        focus = false,
        ...otherProps
    } = props

    const [isFocused, setIsFocused] = useState(false)

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>

    useEffect(() => {
        if (focus && inputRef.current) {
            inputRef.current.focus()
            inputRef.current.select()
        }
    }, [focus])

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    }

    const input = (
        <div
            className={classNames(cls.inputWrapper, mods, [
                className,
                cls[size],
                cls[variant],
            ])}
        >
            {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
            <input
                ref={inputRef}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                readOnly={readonly}
                onBlur={onBlur}
                onFocus={onFocus}
                {...otherProps}
            />
            {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
        </div>
    )

    if (label) {
        return (
            <HStack max gap="8">
                <Text text={label} />
                {input}
            </HStack>
        )
    }

    return input
})
