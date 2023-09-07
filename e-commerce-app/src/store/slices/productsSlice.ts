import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductsFromSlice } from '../../types/slicesTypes/productsSliceTypes';
import { IGetAllProductsResponse } from '../../types/slicesTypes/productsApiTypes';
import { RootStateType } from '../store';

const initialState: IProductsFromSlice = {
  fetching: false,
  products: [],
  total: 0,
  limit: 0,
  offset: 0,
  count: 0,
};

export const productsSlice = createSlice({
  initialState,
  name: 'productsSlice',
  reducers: {
    startLoadingProducts: (state) => {
      state.fetching = true;
    },
    setProducts: (state, action: PayloadAction<IGetAllProductsResponse>) => {
      state.total = action.payload.total;
      state.count = action.payload.count;
      state.offset = action.payload.offset;
      state.limit = action.payload.limit;
      state.products = action.payload.results;
      state.fetching = false;
    },
    resetProducts: (state) => {
      state.fetching = false;
      state.products = [];
      state.total = 0;
      state.limit = 0;
      state.offset = 0;
      state.count = 0;
    },
  },
});

export const getProducts = (state: RootStateType) => state.products.products;
export const getProductsTotal = (state: RootStateType) => state.products.total;
export const isFetchingProducts = (state: RootStateType) => state.products.fetching;
export const ProductsReducer = productsSlice.reducer;
export const { startLoadingProducts, setProducts, resetProducts } = productsSlice.actions;
