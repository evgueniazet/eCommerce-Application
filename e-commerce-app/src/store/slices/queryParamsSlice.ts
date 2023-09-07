import { IQueryParamsFromSlice } from '../../types/slicesTypes/queryParamsSliceTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';
import { SortFormType } from '../../types/searchProductsTypes/filterFormTypes';

const initialState: IQueryParamsFromSlice = {
  limit: 12,
  offset: 0,
  sort: '',
  text: '',
  centAmount: [0, 100],
  categories: '',
};

export const queryParamsSlice = createSlice({
  initialState,
  name: 'queryParamsSlice',
  reducers: {
    setQueryOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setQuerySort: (state, action: PayloadAction<SortFormType>) => {
      state.sort = action.payload;
      state.offset = 0;
    },
    setQueryText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
      state.offset = 0;
    },
    setEmptySort: (state) => {
      state.sort = '';
      state.categories = '';
      state.centAmount = [0, 100];
      state.offset = 0;
    },
    setQueryCentAmount: (state, action: PayloadAction<number[]>) => {
      state.centAmount = [...action.payload];
      state.offset = 0;
    },
    setQueryCategories: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
      state.offset = 0;
    },
  },
});

export const getQueryOffset = (state: RootStateType) => state.queryParams.offset;
export const getQueryLimit = (state: RootStateType) => state.queryParams.limit;
export const getQuerySort = (state: RootStateType) => state.queryParams.sort;
export const getQueryText = (state: RootStateType) => state.queryParams.text;
export const getQueryCentAmount = (state: RootStateType) => state.queryParams.centAmount;
export const getQueryCategories = (state: RootStateType) => state.queryParams.categories;
export const QueryParamsReducer = queryParamsSlice.reducer;
export const {
  setQueryOffset,
  setQuerySort,
  setQueryText,
  setEmptySort,
  setQueryCentAmount,
  setQueryCategories,
} = queryParamsSlice.actions;
