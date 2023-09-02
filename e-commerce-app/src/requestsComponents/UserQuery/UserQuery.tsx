import { JSX, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { Outlet } from 'react-router-dom';
import { useGetMyCustomerDetailsMutation } from '../../api/myCustomerApi';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';
import { clearMyCustomerData, setMyCustomerData } from '../../store/slices/myCustomerSlice';

const UserQuery = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(getAccessToken);

  const [getMyCustomerDetails, { data, isSuccess, isLoading }] = useGetMyCustomerDetailsMutation();

  useEffect(() => {
    console.log('Get details ---> ', accessToken);
    dispatch(clearMyCustomerData());
    if (accessToken) {
      getMyCustomerDetails(accessToken);
    }
  }, []);

  useEffect(() => {
    if (!isSuccess) return;
    if (data) {
      console.log(data);
      dispatch(setMyCustomerData(data));
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <LoadingProgress/>;
  }
  return <Outlet/>;
};
export default UserQuery;
