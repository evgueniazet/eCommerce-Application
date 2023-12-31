import React, { JSX, useEffect, useState } from 'react';
import { useGetAllProductsMutation } from '../../api/productsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { ProductsPage } from '../../pages/ProductsPage/ProductsPage';
import { setProducts, startLoadingProducts } from '../../store/slices/productsSlice';
import {
  getQueryCategories,
  getQueryCentAmount,
  getQueryLimit,
  getQueryOffset,
  getQuerySort,
  getQueryText,
} from '../../store/slices/queryParamsSlice';
import { IBaseQueryParams } from '../../types/slicesTypes/baseApiRequestsTypes';
import { useSearchProductsMutation } from '../../api/productProjectionApi';
import { makeProductSliceObjectFromSearchApiRequest } from '../../utils/makeProductSliceObjectFromSearchApiRequest';
import { makeGetQueryProductsString } from '../../utils/makeGetQueryProductsString';

const ProductsQuery = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);
  const searchQuerySort = useAppSelector(getQuerySort);
  const searchQueryText = useAppSelector(getQueryText);
  const searchQueryCentAmount = useAppSelector(getQueryCentAmount);
  const searchQueryCategories = useAppSelector(getQueryCategories);
  const searchQueryLimit = useAppSelector(getQueryLimit);
  const searchQueryOffset = useAppSelector(getQueryOffset);

  const [params, setParams] = useState<IBaseQueryParams>({
    limit: searchQueryLimit,
  });

  useEffect(() => {
    if (!searchQuerySort && !params.sort) return;
    if (searchQuerySort) {
      setParams((prevState) => ({
        ...prevState,
        sort: searchQuerySort,
      }));
    } else {
      setParams((prevState) => {
        const newState = prevState;
        delete newState.sort;
        return newState;
      });
    }
  }, [searchQuerySort]);

  useEffect(() => {
    if (!searchQueryText && !params['text.en']) return;
    if (searchQueryText) {
      setParams((prevState) => ({
        ...prevState,
        ['text.en']: searchQueryText,
        fuzzy: searchQueryText.length > 2,
        fuzzyLevel: searchQueryText.length <= 2 ? 0 : searchQueryText.length > 4 ? 2 : 1,
      }));
    } else {
      setParams((prevState) => {
        const newObj = {
          ...prevState,
        };
        delete newObj['text.en'];
        delete newObj.fuzzyLevel;
        delete newObj.fuzzy;
        return newObj;
      });
    }
  }, [searchQueryText]);

  useEffect(() => {
    const filterArr: string[] = [];

    if (!(searchQueryCentAmount[0] === 0 && searchQueryCentAmount[1] === 100)) {
      filterArr.push(
        `variants.price.centAmount:range+(${searchQueryCentAmount[0] * 100}+to+${
          searchQueryCentAmount[1] * 100
        })`,
      );
    }
    if (searchQueryCategories) {
      filterArr.push(`categories.id:"${searchQueryCategories}"`);
    }

    if (filterArr.length === 0) {
      if (!params.filter?.length) return;
      setParams((prevState) => {
        const newState = {
          ...prevState,
        };
        delete newState.filter;
        return newState;
      });
      return;
    }
    setParams((prevState) => ({
      ...prevState,
      filter: filterArr,
    }));
  }, [searchQueryCentAmount, searchQueryCategories]);

  useEffect(() => {
    if (searchQueryLimit === params.limit) return;
    if (searchQueryLimit) {
      setParams((prevState) => ({
        ...prevState,
        limit: searchQueryLimit,
      }));
      return;
    }
    setParams((prevState) => {
      const newState = {
        ...prevState,
      };
      delete newState.limit;
      return newState;
    });
  }, [searchQueryLimit]);

  useEffect(() => {
    if (searchQueryOffset === params.offset || (!searchQueryOffset && !params.offset)) return;
    if (searchQueryOffset) {
      setParams((prevState) => ({
        ...prevState,
        offset: searchQueryOffset,
      }));
      return;
    }
    setParams((prevState) => {
      const newState = {
        ...prevState,
      };
      delete newState.offset;
      return newState;
    });
  }, [searchQueryOffset]);

  const [
    getAllProducts,
    {
      isLoading: isLoadingProducts,
      isSuccess: isSuccessProducts,
      isError: isErrorProducts,
      data: dataProducts,
    },
  ] = useGetAllProductsMutation();
  const [
    searchProducts,
    {
      isLoading: isLoadingSearch,
      isSuccess: isSuccessSearch,
      isError: isErrorSearch,
      data: dataSearch,
    },
  ] = useSearchProductsMutation();

  useEffect(() => {
    if (
      (params['text.en']?.length && params['text.en']?.length > 0) ||
      params.sort ||
      (params.filter && params.filter.length > 0)
    ) {
      const resultPath = makeGetQueryProductsString(params);
      searchProducts({
        token: accessToken as string,
        params: {
          resultPath,
        },
      });
    } else {
      getAllProducts({
        token: accessToken as string,
        params,
      });
    }
  }, [params]);

  useEffect(() => {
    if (isLoadingProducts || isLoadingSearch) {
      dispatch(startLoadingProducts());
    }
  }, [isLoadingProducts, isLoadingSearch]);

  useEffect(() => {
    if (
      (isSuccessSearch && params['text.en']) ||
      searchQuerySort ||
      (params.filter && params.filter.length > 0)
    ) {
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
    return <LoadingProgress />;
  }

  return <ProductsPage />;
};
export default ProductsQuery;
