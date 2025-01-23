import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'

import { StateSchema, ThunkExtraArg } from '@/app/providers/StoreProvider'
import { FileType, MyFile } from '@/entities/File'
// eslint-disable-next-line fsd-pathcheker/layer-imports
import { uploaderBarActions } from '@/features/UploaderBar'

type filesArray = {
    folderName: string
    totalSize: number
}

export interface uploadedBarServiceProps {
    file?: File
    filesArray?: filesArray
    dispatch: ThunkDispatch<StateSchema, ThunkExtraArg, UnknownAction>
    fileId: string
}

export const uploadBarService = (props: uploadedBarServiceProps) => {
    const { file, dispatch, fileId, filesArray } = props
    const type: FileType = (file?.name.split('.').pop() as FileType) || 'file'

    if (file) {
        const uploadFile: MyFile = {
            name: file.name,
            progress: 0,
            _id: fileId,
            size: file.size,
            type,
            date: Date.now().toString(),
        }
        dispatch(uploaderBarActions.setUploadedFiles(uploadFile))
    }
    if (filesArray) {
        const uploadFile: MyFile = {
            name: filesArray.folderName,
            progress: 0,
            _id: fileId,
            size: filesArray.totalSize,
            type: 'dir',
            date: Date.now().toString(),
        }
        dispatch(uploaderBarActions.setUploadedFiles(uploadFile))
    }
}
