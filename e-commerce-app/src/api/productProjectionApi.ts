import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGetAllProductsRequest } from '../types/slicesTypes/productsApiTypes';
import { ISearchProductsResponse } from '../types/slicesTypes/productProjectionsApiTypes';

export const productProjectionApi = createApi({
  reducerPath: 'productProjectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_CTP_API_URL}/${process.env.REACT_APP_CTP_PROJECT_KEY}/product-projections`,
  }),
  endpoints: (build) => ({
    searchProducts: build.mutation<ISearchProductsResponse, IGetAllProductsRequest>({
      query(queryObject) {
        let path = '';
        if (queryObject.params && queryObject.params.resultPath) {
          path = queryObject.params.resultPath;
        }
        return {
          url: '/search' + path,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${queryObject.token}`,
          },
        };
      },
    }),
  }),
});
// ,'variants.price.centAmount:range+(1200+to+*)'].join('&filter=')
export const { useSearchProductsMutation } = productProjectionApi;
