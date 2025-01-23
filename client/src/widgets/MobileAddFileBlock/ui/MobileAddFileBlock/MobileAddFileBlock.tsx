import { memo, useCallback, useState } from 'react'

import { CreateNewDirModalMobile } from '@/features/CreateNewDir'
import { UploadFilesMobile } from '@/features/UploadFiles'
import Plus from '@/shared/assets/icons/plus.svg'
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice'
import { Drawer } from '@/shared/ui/Drawer'
import { Icon } from '@/shared/ui/Icon'

interface MobileAddFileBlockProps {
    className?: string
}

export const MobileAddFileBlock = memo((props: MobileAddFileBlockProps) => {
    const { className } = props
    const isMobile = useDevice()

    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    if (!isMobile) {
        return null
    }

    return (
        <>
            <Icon
                Svg={Plus}
                onClick={onOpenDrawer}
                clickable
                width={24}
                height={24}
                color="grey"
            />
            <Drawer onClose={onCloseDrawer} isOpen={isOpen} lazy height={0.2}>
                <CreateNewDirModalMobile />
                <UploadFilesMobile />
            </Drawer>
        </>
    )
})
