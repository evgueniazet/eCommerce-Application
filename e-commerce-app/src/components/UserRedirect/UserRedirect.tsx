import { JSX } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getMyCustomerId } from '../../store/slices/myCustomerSlice';
import { Navigate } from 'react-router-dom';
import LoadingProgress from '../LoadingProgress/LoadingProgress';

const UserRedirect = (): JSX.Element => {
  const myCustomerId = useAppSelector(getMyCustomerId);

  if (!myCustomerId) return <LoadingProgress />;
  return <Navigate to={myCustomerId} />;
};
export default UserRedirect;
