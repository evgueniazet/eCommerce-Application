import React, { JSX, useEffect } from 'react';
import { useGetAllProductsMutation } from '../../api/productsApi';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { Outlet, useNavigate } from 'react-router-dom';

const ProductsQuery = (): JSX.Element => {
  const [getAllProducts, { isLoading, isSuccess, isError, data }] = useGetAllProductsMutation();
  const accessToken = useAppSelector(getAccessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      getAllProducts({
        token: accessToken
      });
    }

  }, []);

  if (isSuccess) {
    console.log(data);
  }

  if (isError) {
    navigate('/');
  }

  if (isLoading) {
    return <LoadingProgress/>;
  }

  return <Outlet/>;
};
export default ProductsQuery;
