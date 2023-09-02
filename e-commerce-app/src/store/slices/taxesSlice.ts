import { ITaxFromSlice } from '../../types/slicesTypes/taxSliceTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetAllTaxesResponse } from '../../types/slicesTypes/taxApiTypes';
import { RootStateType } from '../store';

const initialState: ITaxFromSlice = {
  fetching: false,
  limit: 0,
  count: 0,
  offset: 0,
  total: 0,
  taxes: [],
};

export const taxesSlice = createSlice({
  initialState,
  name: 'taxesSlice',
  reducers: {
    startLoadingTaxes: (state) => {
      state.fetching = true;
    },
    setTaxes: (state, action: PayloadAction<IGetAllTaxesResponse>) => {
      state.total = action.payload.total;
      state.count = action.payload.count;
      state.offset = action.payload.offset;
      state.limit = action.payload.limit;
      state.taxes = action.payload.results;
      state.fetching = false;
    },
  },
});

export const getTaxes = (state: RootStateType) => state.taxes.taxes;
export const TaxesReducer = taxesSlice.reducer;
export const { startLoadingTaxes, setTaxes } = taxesSlice.actions;
