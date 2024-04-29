import { ReactNode } from 'react'

import { createPortal } from 'react-dom'

interface PortalProps {
    /**
     * @description Содержимое Portal.
     */
    children?: ReactNode
    /**
     * @description Элемент, в котором отображается Portal.
     */
    element?: HTMLElement
}

export const Portal = (props: PortalProps) => {
    const { children, element = document.body } = props
    return createPortal(children, element)
}
