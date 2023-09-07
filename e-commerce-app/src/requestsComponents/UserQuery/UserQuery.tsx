import { JSX, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { Outlet } from 'react-router-dom';
import { useGetMyCustomerDetailedInfoQuery } from '../../api/myCustomerApi';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { clearMyCustomerData, setMyCustomerData } from '../../store/slices/myCustomerSlice';

const UserQuery = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken) as string;
  const [waitGuard, setWaitGuard] = useState(false);

  const { data, isSuccess, isLoading, isFetching } = useGetMyCustomerDetailedInfoQuery(accessToken);

  useEffect(() => {
    dispatch(clearMyCustomerData());
    setWaitGuard(isFetching || isLoading);
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (!isSuccess) return;
    if (data) {
      dispatch(setMyCustomerData(data));
      setWaitGuard(false);
    }
  }, [isSuccess, data]);

  if (waitGuard) {
    return <LoadingProgress />;
  }
  return <Outlet />;
};
export default UserQuery;
