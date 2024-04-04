import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsedSpaceBarSchema } from '../types/usedSpaceBarSchema'

const initialState: UsedSpaceBarSchema = {

}

export const usedSpaceBarSlice = createSlice({
  name: 'usedSpaceBar',
  initialState,
  reducers: {
    template: (state, action: PayloadAction<string>) => {

    },
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(usedSpaceBar.pending, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(usedSpaceBar.fulfilled, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(usedSpaceBar.rejected, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
})

export const { actions: usedSpaceBarActions } = usedSpaceBarSlice
export const { reducer: usedSpaceBarReducer } = usedSpaceBarSlice
