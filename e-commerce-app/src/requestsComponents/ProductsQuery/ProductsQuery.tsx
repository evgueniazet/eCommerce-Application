import React, { JSX, useEffect } from 'react';
import { useGetAllProductsQuery } from '../../api/productsApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { ProductsPage } from '../../pages/ProductsPage/ProductsPage';
import { setProducts, startLoadingProducts } from '../../store/slices/productsSlice';

const ProductsQuery = (): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isError, data } = useGetAllProductsQuery({
    token: accessToken as string,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoadingProducts());
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isSuccess) return;
    if (data && 'results' in data) {
      dispatch(setProducts(data));
    }
  }, [isSuccess, data]);

  if (isLoading || isError) {
    return <LoadingProgress />;
  }

  if (isSuccess) {
    return <ProductsPage />;
  }

  return <LoadingProgress />;
};
export default ProductsQuery;
