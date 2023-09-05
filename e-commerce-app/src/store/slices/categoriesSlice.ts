import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';
import { ICategoriesFromSlice } from '../../types/slicesTypes/categoriesSliceTypes';
import { IGetAllCategoriesResponse } from '../../types/slicesTypes/categoriesApiTypes';

const initialState: ICategoriesFromSlice = {
  fetching: false,
  categories: [],
  total: 0,
  limit: 0,
  offset: 0,
  count: 0,
};

export const categoriesSlice = createSlice({
  initialState,
  name: 'categoriesSlice',
  reducers: {
    startLoadingCategories: (state) => {
      state.count = 0;
      state.categories.length = 0;
      state.fetching = true;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setCategories: (state, action: PayloadAction<IGetAllCategoriesResponse>) => {
      state.total = action.payload.total;
      state.count = action.payload.count;
      state.offset = action.payload.offset;
      state.limit = action.payload.limit;
      state.categories = action.payload.results;
      state.fetching = false;
    },
  },
});

export const CategoriesReducer = categoriesSlice.reducer;
export const isFetchingCategories = (state: RootStateType) => state.categories.fetching;
export const getAllCategories = (state: RootStateType) => state.categories.categories;
export const { startLoadingCategories, setCategories } = categoriesSlice.actions;
