import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NoticeSchema } from '../types/noticeSchema'

const initialState: NoticeSchema = {
    dirNameNotice: '',
    noticeMessage: '',
    noticeDelete: '',
    noticeError: '',
}

export const noticeSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setNoticeFileName: (state, action: PayloadAction<string>) => {
            state.dirNameNotice = action.payload
        },
        setNoticeMessage: (state, action: PayloadAction<string>) => {
            state.noticeMessage = action.payload
        },
        setNoticeError: (state, action: PayloadAction<string>) => {
            state.noticeError = action.payload
        },
        setNoticeDelete: (state, action: PayloadAction<string>) => {
            state.noticeDelete = action.payload
        },
        clearNotice: (state) => {
            state.noticeMessage = ''
            state.noticeError = ''
            state.dirNameNotice = ''
            state.noticeDelete = ''
        },
    },
})

export const { actions: noticeActions } = noticeSlice
export const { reducer: noticeReducer } = noticeSlice
