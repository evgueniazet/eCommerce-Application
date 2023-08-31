import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { UserReducer } from './slices/userSlice';
import { myCustomerApi } from '../api/myCustomerApi';
import { productsApi } from '../api/productsApi';
import { categoriesApi } from '../api/categoriesApi';
import { CategoriesReducer } from './slices/categoriesSlice';
import { ProductsReducer } from './slices/productsSlice';
import { productProjectionApi } from '../api/productProjectionApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myCustomerApi.reducerPath]: myCustomerApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productProjectionApi.reducerPath]: productProjectionApi.reducer,
    user: UserReducer,
    categories: CategoriesReducer,
    products: ProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      myCustomerApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      productProjectionApi.middleware,
    ]),
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
