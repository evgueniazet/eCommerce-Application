import React, { JSX, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { Outlet } from 'react-router-dom';
import { useGetAllCategoriesQuery } from '../../api/categoriesApi';
import { setCategories, startLoadingCategories } from '../../store/slices/categoriesSlice';
import { useGetAllTaxesQuery } from '../../api/taxApi';
import { setTaxes, startLoadingTaxes } from '../../store/slices/taxesSlice';

const CategoriesQuery = (): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken);
  const dispatch = useAppDispatch();
  const [waitGuard, setWaitGuard] = useState(false);

  const {
    isLoading: isLoadingTaxes,
    isSuccess: isSuccessTaxes,
    isFetching: isFetchingTaxes,
    data: dataTaxes,
  } = useGetAllTaxesQuery(accessToken as string);

  const {
    isLoading: isLoadingCategories,
    isSuccess: isSuccessCategories,
    isFetching: isFetchingCategories,
    data: dataCategories,
  } = useGetAllCategoriesQuery(accessToken as string);

  useEffect(() => {
    if (isFetchingCategories) {
      dispatch(startLoadingCategories());
    }
    if (isFetchingTaxes) {
      dispatch(startLoadingTaxes());
    }
  }, [isFetchingCategories, isFetchingTaxes, isLoadingCategories, isLoadingTaxes]);

  useEffect(() => {
    if (dataCategories && dataTaxes) {
      setWaitGuard(false);
    } else {
      setWaitGuard(true);
    }
    if (dataCategories && 'results' in dataCategories) {
      dispatch(setCategories(dataCategories));
    }
    if (dataTaxes && 'results' in dataTaxes) {
      dispatch(setTaxes(dataTaxes));
    }
  }, [isSuccessCategories, dataCategories, isSuccessTaxes, dataTaxes]);

  if (waitGuard) {
    return <LoadingProgress/>;
  }

  return <Outlet/>;
};
export default CategoriesQuery;
