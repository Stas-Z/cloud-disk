import { StateSchema } from '@/app/providers/StoreProvider'

export const getNoticeFileName = (state: StateSchema) =>
    state?.notice.dirNameNotice || ''
export const getNoticeMessage = (state: StateSchema) =>
    state?.notice.noticeMessage || ''
export const getNoticeError = (state: StateSchema) =>
    state?.notice.noticeError || ''
