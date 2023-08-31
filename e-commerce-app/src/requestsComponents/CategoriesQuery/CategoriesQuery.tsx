import React, { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { Outlet } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../api/categoriesApi';
import { setCategories } from '../../store/slices/categoriesSlice';

const CategoriesQuery = (): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess, data } = useGetAllCategoriesQuery(accessToken as string);

  useEffect(() => {
    if (!isSuccess) return;
    if (data && 'results' in data) {
      dispatch(setCategories(data));
    }
  }, [isSuccess, data]);

  if (isLoading || isError) {
    return <LoadingProgress />;
  }

  return <Outlet />;
};
export default CategoriesQuery;
