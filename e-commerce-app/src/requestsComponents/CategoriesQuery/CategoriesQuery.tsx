import React, { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { Outlet } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../api/categoriesApi';
import { setCategories } from '../../store/slices/categoriesSlice';
import { useGetAllTaxesQuery } from '../../api/taxApi';
import { setTaxes } from '../../store/slices/taxesSlice';

const CategoriesQuery = (): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();

  const {
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    isSuccess: isSuccessCategories,
    data: dataCategories,
  } = useGetAllCategoriesQuery(accessToken as string);
  const {
    isLoading: isLoadingTaxes,
    isError: isErrorTaxes,
    isSuccess: isSuccessTaxes,
    data: dataTaxes,
  } = useGetAllTaxesQuery(accessToken as string);

  useEffect(() => {
    if (!isSuccessCategories) return;
    if (dataCategories && 'results' in dataCategories) {
      dispatch(setCategories(dataCategories));
    }
  }, [isSuccessCategories, dataCategories]);

  useEffect(() => {
    if (!isSuccessCategories) return;
    if (dataTaxes && 'results' in dataTaxes) {
      dispatch(setTaxes(dataTaxes));
    }
  }, [isSuccessTaxes, dataTaxes]);

  if (isLoadingCategories || isErrorCategories || isLoadingTaxes || isErrorTaxes) {
    return <LoadingProgress />;
  }

  return <Outlet />;
};
export default CategoriesQuery;
