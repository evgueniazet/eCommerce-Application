import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductsFromSlice } from '../../types/slicesTypes/productsSliceTypes';
import { IGetAllProductsResponse } from '../../types/slicesTypes/productsApiTypes';

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
    startLoading: (state) => {
      state.fetching = true;
    },
    setProducts: (state, action: PayloadAction<IGetAllProductsResponse>) => {
      state.total = action.payload.total;
      state.count = action.payload.count;
      state.offset = action.payload.offset;
      state.limit = action.payload.limit;
      state.products = action.payload.results;
      state.fetching = false;
    }
  }
});

export const ProductsReducer = productsSlice.reducer;
export const { startLoading, setProducts } = productsSlice.actions;
