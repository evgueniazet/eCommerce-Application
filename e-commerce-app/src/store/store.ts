import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { UserReducer } from './slices/userSlice';
import { myCustomerApi } from '../api/myCustomerApi';
import { productsApi } from '../api/productsApi';
import { categoriesApi } from '../api/categoriesApi';
import { CategoriesReducer } from './slices/categoriesSlice';
import { ProductsReducer } from './slices/productsSlice';
import { productProjectionApi } from '../api/productProjectionApi';
import { QueryParamsReducer } from './slices/queryParamsSlice';
import { taxApi } from '../api/taxApi';
import { TaxesReducer } from './slices/taxesSlice';
import { MyCustomerReducer } from './slices/myCustomerSlice';
import { cartApi } from '../api/cartApi';
import { CartReducer } from './slices/cartSlice';
import { discountCodesApi } from '../api/discountCodesApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [myCustomerApi.reducerPath]: myCustomerApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [taxApi.reducerPath]: taxApi.reducer,
    [productProjectionApi.reducerPath]: productProjectionApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [discountCodesApi.reducerPath]: discountCodesApi.reducer,
    user: UserReducer,
    categories: CategoriesReducer,
    products: ProductsReducer,
    queryParams: QueryParamsReducer,
    taxes: TaxesReducer,
    myCustomer: MyCustomerReducer,
    cart: CartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      myCustomerApi.middleware,
      productsApi.middleware,
      categoriesApi.middleware,
      productProjectionApi.middleware,
      taxApi.middleware,
      cartApi.middleware,
      discountCodesApi.middleware,
    ]),
});

export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
