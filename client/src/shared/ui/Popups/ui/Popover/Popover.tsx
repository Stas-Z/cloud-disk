import { ReactNode, memo } from 'react'

import { Popover as HPopover } from '@headlessui/react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'

import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'

interface PopoverProps {
    /**
     * @description Дополнительный класс.
     */
    className?: string
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
     * @description Содержимое Popover.
     */
    children: ReactNode
}

export const Popover = memo((props: PopoverProps) => {
    const { className, trigger, direction = 'bottom_right', children } = props

    return (
        <HPopover
            className={classNames(cls.popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(cls.panel, {}, [
                    popupCls[direction],
                    popupCls.menu,
                ])}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    )
})
