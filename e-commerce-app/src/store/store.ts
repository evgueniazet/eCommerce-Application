import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { UserReducer } from './slices/userSlice';
import { myCustomerApi } from '../api/myCustomerApi';
import { productsApi } from '../api/productsApi';
import { categoriesApi } from '../api/categoriesApi';
import { CategoriesReducer } from './slices/categoriesSlice';
import { ProductsReducer } from './slices/productsSlice';
import { taxApi } from '../api/taxApi';
import { TaxesReducer } from './slices/taxesSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myCustomerApi.reducerPath]: myCustomerApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [taxApi.reducerPath]: taxApi.reducer,
    user: UserReducer,
    categories: CategoriesReducer,
    products: ProductsReducer,
    taxes: TaxesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      myCustomerApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      taxApi.middleware,
    ]),
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
