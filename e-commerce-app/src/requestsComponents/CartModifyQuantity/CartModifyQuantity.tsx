import { FC, JSX } from 'react';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { findProductInCart, selectCart, useUpdateCartMutation } from '../../api/cartApi';
import {
  IAddLineItemCart,
  ICartApiResponse,
  IRemoveLineItemCart,
} from '../../types/slicesTypes/cart';
import CartQuery from '../CartQuery/CartQuery';
import { IUpdateCartApiObjectRequest } from '../../types/slicesTypes/cart/updateCartApiTypes';

interface ICartModifyQuantityProps {
  productId: string;
}

const CartModifyQuantity: FC<ICartModifyQuantityProps> = ({ productId }): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken) as string;
  const cartId = (useAppSelector(selectCart) as ICartApiResponse)?.id as string;
  const cartVersion = (useAppSelector(selectCart) as ICartApiResponse)?.version as number;
  const productInCart = useAppSelector((state) => findProductInCart(state, productId));

  const [updateCart] = useUpdateCartMutation();

  if (!cartId || !cartVersion) {
    return <CartQuery />;
  }

  const decreaseQuantity = () => {
    if (
      productInCart?.quantity === undefined ||
      Number.isNaN(productInCart.quantity) ||
      productInCart.quantity < 0
    )
      return;
    const actionObject: IRemoveLineItemCart = {
      action: 'removeLineItem',
      lineItemId: productInCart.id,
      quantity: 1,
    };
    const queryObj: IUpdateCartApiObjectRequest = {
      cartId,
      token: accessToken,
      data: { version: cartVersion, actions: [actionObject] },
    };
    updateCart(queryObj);
  };

  const increaseQuantity = () => {
    const actionObject: IAddLineItemCart = {
      action: 'addLineItem',
      productId,
      quantity: 1,
    };
    const queryObj: IUpdateCartApiObjectRequest = {
      cartId,
      token: accessToken,
      data: { version: cartVersion, actions: [actionObject] },
    };
    updateCart(queryObj);
  };

  return (
    <Grid container spacing={1} alignItems={'center'}>
      <Grid item>
        <Button
          onClick={decreaseQuantity}
          sx={{ minWidth: 'min-content', backgroundColor: 'beige' }}
          variant="outlined"
          color="success"
          aria-label="reduce"
          disabled={!productInCart?.quantity}
        >
          <RemoveIcon fontSize="inherit" />
        </Button>
      </Grid>
      <Grid item>
        <Typography className="count" padding="0.7rem  0">
          {productInCart?.quantity || 0}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={increaseQuantity}
          sx={{ minWidth: 'min-content', backgroundColor: 'beige' }}
          variant="outlined"
          color="success"
          aria-label="increase"
        >
          <AddIcon fontSize="inherit" />
        </Button>
      </Grid>
    </Grid>
  );
};
export default CartModifyQuantity;
