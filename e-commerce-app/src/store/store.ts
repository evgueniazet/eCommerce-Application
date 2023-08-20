import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import UserReducer from './slices/userSlice';
import { myCustomerApi } from '../api/myCustomerApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myCustomerApi.reducerPath]: myCustomerApi.reducer,
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, myCustomerApi.middleware]),
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
