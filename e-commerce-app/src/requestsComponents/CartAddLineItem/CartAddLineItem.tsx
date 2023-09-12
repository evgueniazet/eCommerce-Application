import { FC, JSX } from 'react';
import { IUpdateCartApiObjectRequest } from '../../types/slicesTypes/cart/updateCartApiTypes';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { findProductInCart, selectCart, useUpdateCartMutation } from '../../api/cartApi';
import {
  IAddLineItemCart,
  ICartApiResponse,
  IRemoveLineItemCart,
} from '../../types/slicesTypes/cart';
import { ButtonProps } from '@mui/material';
import Button from '@mui/material/Button';
import CartQuery from '../CartQuery/CartQuery';
interface ICartAddLineItemProps {
  children?: string | JSX.Element | JSX.Element[] | React.ReactNode;
  productId: string;
  variantId?: number;
  props?: ButtonProps;
}
const CartAddLineItem: FC<ICartAddLineItemProps> = ({
  children,
  productId,
  variantId,
  props,
}): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken) as string;
  const cartId = (useAppSelector(selectCart) as ICartApiResponse)?.id as string;
  const cartVersion = (useAppSelector(selectCart) as ICartApiResponse)?.version as number;
  const productInCart = useAppSelector((state) => findProductInCart(state, productId));

  const [updateCart, { isLoading }] = useUpdateCartMutation();

  if (!cartId || !cartVersion) {
    return <CartQuery />;
  }

  const toggleLineItem = () => {
    if (productInCart) {
      const actionObject: IRemoveLineItemCart = {
        action: 'removeLineItem',
        lineItemId: productInCart.id,
        quantity: productInCart.quantity,
      };
      const queryObj: IUpdateCartApiObjectRequest = {
        cartId,
        token: accessToken,
        data: { version: cartVersion, actions: [actionObject] },
      };
      updateCart(queryObj).then((a) => console.log(a));
    } else {
      const actionObject: IAddLineItemCart = {
        action: 'addLineItem',
        productId,
        quantity: 1,
      };
      if (variantId) {
        actionObject.variantId = variantId;
      }
      const queryObj: IUpdateCartApiObjectRequest = {
        cartId,
        token: accessToken,
        data: { version: cartVersion, actions: [actionObject] },
      };
      updateCart(queryObj).then((a) => console.log(a));
    }
  };

  return (
    <Button {...props} onClick={toggleLineItem} disabled={isLoading}>
      {children}
      {productInCart ? 'Remove from Cart' : 'Add to Cart'}
    </Button>
  );
};
export default CartAddLineItem;
