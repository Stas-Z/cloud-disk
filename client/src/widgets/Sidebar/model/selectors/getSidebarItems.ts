import { useSelector } from 'react-redux'

import { getUserData } from '@/entities/User'
import MenuFile from '@/shared/assets/icons/menu-file.svg'
import ProfileIcon from '@/shared/assets/icons/menu-users.svg'
import { getRouteFiles, getRouteProfile } from '@/shared/const/router'

import { SidebarItemType } from '../types/sidebar'

export const useSidebarItems = () => {
    const userData = useSelector(getUserData)
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteFiles(),
            Icon: MenuFile,
            text: 'Files',
        },
    ]

    if (userData) {
        sidebarItemsList.push({
            path: getRouteProfile(),
            Icon: ProfileIcon,
            text: 'Profile',
            authOnly: true,
        })
    }

    return sidebarItemsList
}
