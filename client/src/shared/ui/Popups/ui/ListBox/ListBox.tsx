import { Fragment, ReactNode, useMemo } from 'react'

import { Listbox as HListbox } from '@headlessui/react'

import CheckIcon from '@/shared/assets/icons/check.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { DropdownDirection } from '@/shared/types/ui'

import cls from './ListBox.module.scss'
import { Button } from '../../../Button/Button'
import { Icon } from '../../../Icon'
import { HStack } from '../../../Stack'

export interface ListBoxItem<T extends string> {
    /**
     * @description Значение опции.
     */
    value: T
    /**
     * @description Содержимое опции.
     */
    content: ReactNode
    /**
     * @description Флаг делает опцию неактивной.
     */
    disabled?: boolean
    /**
     * @description Компонент иконка опции.
     */
    Icon?: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface ListBoxProps<T extends string> {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Список элементов для отображения в ListBox.
     */
    items?: ListBoxItem<T>[]
    /**
     * @description Значение элементов в ListBox.
     */
    value?: T
    /**
     * @description Выбранное значение в списке ListBox.
     */
    defaultValue?: string
    /**
     * @description Callback для изменения значения.
     */
    onChange: (value: T) => void
    /**
     * @description Флаг для отключения списка.
     */
    readonly?: boolean
    /**
     * @description Направление раскрывающегося списка.
     * @default 'bottom_right'
     */
    direction?: DropdownDirection
    /**
     * @description Label для ListBox.
     */
    label?: string
    /**
     * @description Содержимое для отображения на левой стороне.
     */
    addonLeft?: ReactNode
    /**
     * @description Содержимое для отображения на правой стороне.
     */
    addonRight?: ReactNode
}

export const ListBox = typedMemo(<T extends string>(props: ListBoxProps<T>) => {
    const {
        className,
        items,
        onChange,
        defaultValue,
        value,
        readonly,
        direction = 'bottom_right',
        label,
        addonLeft,
        addonRight,
    } = props

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value)
    }, [items, value])

    const selectedItemIcon = useMemo(() => {
        if (selectedItem && selectedItem?.Icon) {
            return (
                <div className={cls.icon}>
                    <Icon Svg={selectedItem.Icon} />
                </div>
            )
        }
        return ''
    }, [selectedItem])

    return (
        <HStack gap="4" className={classNames('', {}, [cls.popup])}>
            <HListbox
                disabled={readonly}
                as="div"
                className={classNames(cls.listBox, {}, [className])}
                value={value}
                onChange={onChange}
            >
                <HListbox.Button as="div">
                    <Button
                        disabled={readonly}
                        className={cls.listButton}
                        variant="clear"
                        addonRight={addonRight}
                        addonLeft={addonLeft}
                    >
                        {label && (
                            <span
                                className={classNames('', {}, [cls.label])}
                            >{`${label}`}</span>
                        )}
                        {defaultValue || selectedItem?.Icon
                            ? selectedItemIcon
                            : selectedItem?.content}
                    </Button>
                </HListbox.Button>
                <HListbox.Options
                    className={classNames(cls.options, {}, [
                        cls[direction],
                        cls.menu,
                    ])}
                >
                    {items?.map((item) => (
                        <HListbox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => {
                                return (
                                    <li
                                        className={classNames(cls.item, {
                                            [cls.active]: active,
                                            [cls.selected]: selected,
                                            [cls.disabled]: item.disabled,
                                        })}
                                    >
                                        {item.Icon && (
                                            <div className={cls.optionsIcon}>
                                                <Icon Svg={item.Icon} />
                                            </div>
                                        )}
                                        {item.Icon && (
                                            <span>{item.content}</span>
                                        )}
                                        <HStack
                                            as="span"
                                            className={
                                                item.Icon
                                                    ? cls.iconWrapperRight
                                                    : cls.iconWrapperLeft
                                            }
                                        >
                                            {selected && (
                                                <Icon
                                                    Svg={CheckIcon}
                                                    height={10}
                                                    width={16}
                                                />
                                            )}
                                        </HStack>

                                        {!item.Icon && (
                                            <span>{item.content}</span>
                                        )}
                                    </li>
                                )
                            }}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>
    )
})
