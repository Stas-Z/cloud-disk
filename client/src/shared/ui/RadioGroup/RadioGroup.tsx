import { Fragment, ReactNode } from 'react'

import { RadioGroup as HLRadioGroup } from '@headlessui/react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'

import cls from './RadioGroup.module.scss'
import { Icon } from '../Icon'

export interface RadioGroupItem<T extends string> {
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
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>
}

interface RadioGroupProps<T extends string> {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Значение элементов в RadioGroup.
     */
    value?: T
    /**
     * @description Callback для изменения значения.
     */
    onChange: (value: T) => void
    /**
     * @description Список элементов для отображения в RadioGroup.
     */
    items?: RadioGroupItem<T>[]
    /**
     * @description Label для RadioGroup.
     */
    label?: string
}

export const RadioGroup = typedMemo(
    <T extends string>(props: RadioGroupProps<T>) => {
        const { className, value, onChange, items, label } = props

        return (
            <HLRadioGroup
                value={value}
                onChange={onChange}
                className={classNames(cls.radioGroup, {}, [className])}
            >
                <HLRadioGroup.Label className={cls.label}>
                    {label}
                </HLRadioGroup.Label>
                <div role="radiogroup" className={cls.options}>
                    {items?.map((item) => (
                        <HLRadioGroup.Option
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {({ active, checked }) => (
                                <div className={cls.optionItem}>
                                    {!item.Icon && (
                                        <div
                                            className={classNames(
                                                cls.radioBox,
                                                { [cls.checked]: checked },
                                                [],
                                            )}
                                        />
                                    )}
                                    {item.Icon && (
                                        <div
                                            className={classNames(
                                                cls.optionsIcon,
                                                { [cls.active]: checked },
                                                [],
                                            )}
                                        >
                                            <Icon Svg={item.Icon} />
                                        </div>
                                    )}
                                    {item.content}
                                </div>
                            )}
                        </HLRadioGroup.Option>
                    ))}
                </div>
            </HLRadioGroup>
        )
    },
)
