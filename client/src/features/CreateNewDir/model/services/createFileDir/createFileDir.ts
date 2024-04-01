import { createAsyncThunk } from '@reduxjs/toolkit'

import { ThunkConfig } from '@/app/providers/StoreProvider'
import { MyFile, FileType, fetchFilesList } from '@/entities/File'
import { noticeActions } from '@/entities/Notice'

interface createFileDirProps {
    name: string
    parent: string | null
    type: FileType
    updateList?: boolean
}

export const createFileDir = createAsyncThunk<
    MyFile,
    createFileDirProps,
    ThunkConfig<string>
>(
    'createNewDir/createFileDir',
    async ({ name, parent, type, updateList = true }, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI

        try {
            const response = await extra.api.post<MyFile>('files', {
                name,
                parent: parent || null,
                type,
            })

            if (!response.data) {
                throw new Error()
            }

            if (updateList) {
                dispatch(fetchFilesList({}))
            }

            dispatch(
                noticeActions.setNoticeMessage(
                    'You have successfully created a folder',
                ),
            )

            return response.data
        } catch (e: any) {
            if (e.response && e.response.data.message) {
                return rejectWithValue(e.response.data.message)
            }
            return rejectWithValue(e.message)
        }
    },
)
