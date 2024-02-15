import { StateSchema } from '@/app/providers/StoreProvider'

import { filesAdapter } from '../../slices/filePageSlice'

export const getAllFiles = filesAdapter.getSelectors<StateSchema>(
    (state) => state.filesPage || filesAdapter.getInitialState(),
)
