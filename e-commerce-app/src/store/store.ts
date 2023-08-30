import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { UserReducer } from './slices/userSlice';
import { myCustomerApi } from '../api/myCustomerApi';
import { productsApi } from '../api/productsApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myCustomerApi.reducerPath]: myCustomerApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      myCustomerApi.middleware,
      productsApi.middleware,
    ]),
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
