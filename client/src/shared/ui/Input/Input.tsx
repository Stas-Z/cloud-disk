import React, { InputHTMLAttributes, ReactNode, memo, useState } from 'react'

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
interface InputProps extends HTMLInputProps {
  /**
   * @description additional class.
   */
  className?: string
  /**
   * @description The value in Input
   */
  value?: string | number
  /**
   * @description Callback to change value in input
   */
  onChange?: (value: string) => void
  /**
   * @description Flag to disable Input and to add readonly class
   */
  readonly?: boolean
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
   * @description Label for input
   */
  label?: string
  /**
   * @description The height of input
   */
  size?: InputSize
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
    ...otherProps
  } = props

  const [isFocused, setIsFocused] = useState(false)

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
    <div className={classNames(cls.inputWrapper, mods, [className, cls[size]])}>
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      <input
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
