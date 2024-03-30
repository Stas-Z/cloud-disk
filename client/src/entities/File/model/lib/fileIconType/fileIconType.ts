import FileImgIcon from '@/shared/assets/icons/file-img.svg'
import FileRarIcon from '@/shared/assets/icons/file-rar.svg'
import FileTxtIcon from '@/shared/assets/icons/file-txt.svg'
import FileVideoIcon from '@/shared/assets/icons/file-video.svg'
import FileZipIcon from '@/shared/assets/icons/file-zip.svg'
import FileIcon from '@/shared/assets/icons/file.svg'
import FolderIcon from '@/shared/assets/icons/folder.svg'

import { FileType } from '../../types/files'

export const fileIconType = (fileType?: FileType) => {
    const iconMap: {
        [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    } = {
        dir: FolderIcon,
        file: FileIcon,
        png: FileImgIcon,
        jpg: FileImgIcon,
        JPG: FileImgIcon,
        tif: FileImgIcon,
        txt: FileTxtIcon,
        rar: FileRarIcon,
        zip: FileZipIcon,
        mp4: FileVideoIcon,
        avi: FileVideoIcon,
        mov: FileVideoIcon,
    }

    return iconMap[fileType || 'file'] || FileIcon
}
