import { Fragment, ReactNode, useMemo } from 'react'

import { Listbox as HListbox } from '@headlessui/react'

import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { DropdownDirection } from '@/shared/types/ui'

import cls from './ListBox.module.scss'
import { Button } from '../../../Button/Button'
import { Icon } from '../../../Icon'
import { HStack } from '../../../Stack'
import popupCls from '../../styles/popup.module.scss'

export interface ListBoxItem<T extends string> {
    value: T
    content: ReactNode
    disabled?: boolean
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
     * @description Flag to add additional editing class.
     */
    editing?: boolean
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
        editing,
    } = props

    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value)
    }, [items, value])

    return (
        <HStack gap="8" className={classNames('', {}, [popupCls.popup])}>
            {label && (
                <span className={classNames('', { [cls.editing]: editing })}>
                    {`${label}`}
                </span>
            )}
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
                        variant="filled"
                        addonRight={<Icon Svg={ArrowIcon} />}
                    >
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListbox.Button>
                <HListbox.Options
                    className={classNames(cls.options, {}, [
                        popupCls[direction],
                        popupCls.menu,
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
                                            [popupCls.active]: active,
                                            [popupCls.selected]: selected,
                                            [popupCls.disabled]: item.disabled,
                                        })}
                                    >
                                        <span>{item.content}</span>
                                        {selected}
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
