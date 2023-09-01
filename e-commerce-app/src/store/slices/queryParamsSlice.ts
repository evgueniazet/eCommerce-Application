import { IQueryParamsFromSlice } from '../../types/slicesTypes/queryParamsSliceTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';

const initialState: IQueryParamsFromSlice = {
  limit: 12,
  offset: 0,
  sort: '',
  text: '',
};

export const queryParamsSlice = createSlice({
  initialState,
  name: 'queryParamsSlice',
  reducers: {
    setQueryOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setQuerySort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setQueryText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    }
  }
});

export const getQueryOffset = (state: RootStateType) => state.queryParams.offset;
export const getQuerySort = (state: RootStateType) => state.queryParams.sort;
export const getQueryText = (state: RootStateType) => state.queryParams.text;
export const getQueryLimit = (state: RootStateType) => state.queryParams.limit;
export const QueryParamsReducer = queryParamsSlice.reducer;
export const { setQueryOffset, setQuerySort, setQueryText } = queryParamsSlice.actions;
