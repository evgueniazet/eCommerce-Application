import { ICartApiResponse, ICartFromSlice } from '../../types/slicesTypes/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ICartFromSlice = {
  cart: null,
};

export const cartSlice = createSlice({
  initialState,
  name: 'cartSlice',
  reducers: {
    resetCart: (state) => {
      state.cart = null;
    },
    setCart: (state, action: PayloadAction<ICartApiResponse>) => {
      state.cart = action.payload;
    }
  }
});

export const CartReducer = cartSlice.reducer;
export const { resetCart, setCart } = cartSlice.actions;
