import { Fragment, ReactNode, memo } from 'react'

import { Menu } from '@headlessui/react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'

import cls from './Dropdown.module.scss'
import { AppLink } from '../../../AppLink'
import { Icon } from '../../../Icon'
import popupCls from '../../styles/popup.module.scss'

export interface DropdownItem {
    /**
     * @description Флаг делает опцию неактивной.
     */
    disabled?: boolean
    /**
     * @description Содержимое опции.
     */
    content?: ReactNode
    /**
     * @description Callback нажатия на опцию.
     */
    onClick?: () => void
    /**
     * @description Ссылка опции.
     */
    href?: string
    /**
     * @description Id опции.
     */
    id?: string
    /**
     * @description Компонент иконка опции.
     */
    Icon?: React.VFC<React.SVGProps<SVGSVGElement>>
}

interface DropdownProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
    /**
     * @description Список элементов для отображения в раскрывающемся списке.
     */
    items: DropdownItem[]
    /**
     * @description Дочерние элементы компонента кнопки триггера.
     */
    trigger: ReactNode
    /**
     * @description Направление раскрывающегося списка.
     * @default 'bottom_right'
     */
    direction?: DropdownDirection
    /**
     * @description Информация о пользователе: аватар и адрес электронной почты.
     */
    addonTop?: ReactNode
}

export const Dropdown = memo((props: DropdownProps) => {
    const {
        className,
        items,
        trigger,
        direction = 'bottom_right',
        addonTop,
    } = props

    return (
        <Menu
            as="div"
            className={classNames(cls.dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <Menu.Button className={popupCls.trigger} as="div">
                {trigger}
            </Menu.Button>
            <Menu.Items
                className={classNames(cls.menu, {}, [
                    popupCls[direction],
                    popupCls.menu,
                ])}
            >
                {addonTop && addonTop}
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [popupCls.active]: active,
                            })}
                            disabled={item.disabled}
                        >
                            {item.Icon && <Icon Svg={item.Icon} />}
                            <span className={cls.link}>{item.content}</span>
                        </button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                key={item.id}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item
                            as={Fragment}
                            disabled={item.disabled}
                            key={item.id}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
})
