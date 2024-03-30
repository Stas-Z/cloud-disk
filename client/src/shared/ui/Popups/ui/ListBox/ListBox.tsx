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
    value: T
    content: ReactNode
    disabled?: boolean
    Icon?: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface ListBoxProps<T extends string> {
    /**
     * @description additional class.
     */
    className?: string
    /**
     * @description List of items to render in ListBox
     */
    items?: ListBoxItem<T>[]
    /**
     * @description The value of items in ListBox
     */
    value?: T
    /**
     * @description The selected value in listbox
     */
    defaultValue?: string
    /**
     * @description Callback to change value
     */
    onChange: (value: T) => void
    /**
     * @description Flag to disable listbox.
     */
    readonly?: boolean
    /**
     * @description Direction of dropdown
     * @default 'bottom_right'
     */
    direction?: DropdownDirection
    /**
     * @description Label for the ListBox
     */
    label?: string
    /**
     * @description Content to render on the left side
     */
    addonLeft?: ReactNode
    /**
     * @description Content to render on the right side of input
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
                    <Icon width={16} height={16} Svg={selectedItem.Icon} />
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
                                                <Icon
                                                    width={16}
                                                    height={16}
                                                    Svg={item.Icon}
                                                />
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
