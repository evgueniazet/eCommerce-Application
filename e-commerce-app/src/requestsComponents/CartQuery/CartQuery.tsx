import { FC, JSX, useEffect } from 'react';
import { selectCart, useLazyGetMyActiveCartQuery } from '../../api/cartApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { setCart } from '../../store/slices/cartSlice';
import LoadingProgress from '../../components/LoadingProgress/LoadingProgress';

interface ICartQueryProps {
  children?: string | JSX.Element | JSX.Element[] | React.ReactNode
}

const CartQuery: FC<ICartQueryProps> = ({children}): JSX.Element => {
  const [getMyActiveCart, {isLoading, isFetching, isSuccess, data}] = useLazyGetMyActiveCartQuery();
  const accessToken = useAppSelector(getAccessToken) as string;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setCart(data));
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (cart) return;
    getMyActiveCart(accessToken);
  }, [cart]);

  if (isLoading || isFetching) {
    return <LoadingProgress />;
  }

  return (
    <>
      {children}
    </>
  );
};
export default CartQuery;
