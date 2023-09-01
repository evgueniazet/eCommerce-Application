import React, { JSX, useEffect, useState } from 'react';
import { useGetAllProductsMutation } from '../../api/productsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { ProductsPage } from '../../pages/ProductsPage/ProductsPage';
import { setProducts, startLoadingProducts } from '../../store/slices/productsSlice';
import { getQueryLimit, getQueryOffset, getQueryText } from '../../store/slices/queryParamsSlice';
import { IBaseQueryParams } from '../../types/slicesTypes/baseApiRequestsTypes';
import { useSearchProductsMutation } from '../../api/productProjectionApi';
import { makeProductSliceObjectFromSearchApiRequest } from '../../utils/makeProductSliceObjectFromSearchApiRequest';

const ProductsQuery = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const searchQueryText = useAppSelector(getQueryText);
  const searchQueryLimit = useAppSelector(getQueryLimit);
  const searchQueryOffset = useAppSelector(getQueryOffset);

  const [params, setParams] = useState<IBaseQueryParams>({
    limit: searchQueryLimit || 12,
  });

  useEffect(() => {
    if (searchQueryOffset) {
      setParams(prevState => ({
        ...prevState,
        offset: searchQueryOffset,
      }));
    }
  }, [searchQueryOffset]);

  useEffect(() => {
    if (searchQueryText) {
      setParams(prevState => ({
        ...prevState,
        ['text.en']: searchQueryText,
        fuzzy: searchQueryText.length > 2,
        fuzzyLevel: searchQueryText.length <= 2 ? 0 : 1.
      }));
    } else {
      setParams(prevState => {
        const newObj = {
          ...prevState
        };
        delete newObj['text.en'];
        delete newObj.fuzzyLevel;
        delete newObj.fuzzy;
        return newObj;
      });
    }
  }, [searchQueryText]);

  const [getAllProducts, {
    isLoading: isLoadingProducts,
    isSuccess: isSuccessProducts,
    isError: isErrorProducts,
    data: dataProducts
  }] = useGetAllProductsMutation();
  const [searchProducts, {
    isLoading: isLoadingSearch,
    isSuccess: isSuccessSearch,
    isError: isErrorSearch,
    data: dataSearch
  }] = useSearchProductsMutation();

  useEffect(() => {
    if (params['text.en']?.length && params['text.en']?.length > 0) {
      searchProducts({
        token: accessToken as string,
        params,
      });
    } else {
      getAllProducts({
        token: accessToken as string,
        params,
      });
    }
  }, [params['text.en']]);

  useEffect(() => {
    if (isLoadingProducts || isLoadingSearch) {
      dispatch(startLoadingProducts());
    }
  }, [isLoadingProducts, isLoadingSearch]);

  useEffect(() => {
    if (isSuccessSearch && params['text.en']) {
      if (dataSearch && 'results' in dataSearch) {
        const pushingObject = makeProductSliceObjectFromSearchApiRequest(dataSearch);
        dispatch(setProducts(pushingObject));
      }
      return;
    }
    if (isSuccessProducts) {
      if (dataProducts && 'results' in dataProducts) {
        dispatch(setProducts(dataProducts));
      }
    }
  }, [isSuccessProducts, dataProducts, isSuccessSearch, dataSearch]);

  if (isLoadingProducts || isErrorProducts || isLoadingSearch || isErrorSearch) {
    return <LoadingProgress/>;
  }

  return <ProductsPage/>;
};
export default ProductsQuery;
