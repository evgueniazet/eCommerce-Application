import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import UserReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: UserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([authApi.middleware]),
});

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
