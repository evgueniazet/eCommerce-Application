import React from 'react';
import { Button } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { selectCart, useUpdateCartMutation } from '../../api/cartApi';
import {
  IActionCart,
  ICartApiResponse,
  ICartLineItem,
  IRemoveLineItemCart,
} from '../../types/slicesTypes/cart';
import { IUpdateCartApiObjectRequest } from '../../types/slicesTypes/cart/updateCartApiTypes';

const CartClear = () => {
  const accessToken = useAppSelector(getAccessToken) as string;
  const cartId = (useAppSelector(selectCart) as ICartApiResponse)?.id as string;
  const cartVersion = (useAppSelector(selectCart) as ICartApiResponse)?.version as number;
  const lineItems = (useAppSelector(selectCart) as ICartApiResponse)?.lineItems as ICartLineItem[];

  const [updateCart, { isLoading }] = useUpdateCartMutation();

  const clearCartHandler = () => {
    const actions: IActionCart[] = [];
    lineItems.forEach((item) => {
      const actionObject: IRemoveLineItemCart = {
        action: 'removeLineItem',
        lineItemId: item.id,
        quantity: item.quantity,
      };
      actions.push(actionObject);
    });
    const queryObj: IUpdateCartApiObjectRequest = {
      cartId,
      token: accessToken,
      data: { version: cartVersion, actions },
    };
    updateCart(queryObj);
  };

  return (
    <Button
      onClick={clearCartHandler}
      sx={{ height: '40px' }}
      variant="outlined"
      color="error"
      disabled={isLoading}
    >
      Clear Cart
    </Button>
  );
};

export default CartClear;
