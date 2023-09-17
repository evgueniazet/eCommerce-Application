import { JSX } from 'react';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import { Alert, Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IAddDiscountCodeCart, ICartApiResponse } from '../../types/slicesTypes/cart';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';
import { selectCart, useUpdateCartMutation } from '../../api/cartApi';
import { IUpdateCartApiObjectRequest } from '../../types/slicesTypes/cart/updateCartApiTypes';

interface IDiscountForm {
  discount: string;
}

const BasketDiscountForm = (): JSX.Element => {
  const { control, handleSubmit } = useForm<IDiscountForm>();
  const accessToken = useAppSelector(getAccessToken) as string;
  const cartId = (useAppSelector(selectCart) as ICartApiResponse)?.id as string;
  const cartVersion = (useAppSelector(selectCart) as ICartApiResponse)?.version as number;

  const [updateCart, { isLoading, isError, error }] = useUpdateCartMutation();
  const submitHandler: SubmitHandler<IDiscountForm> = (data) => {
    if (!data.discount) return;
    const actionObject: IAddDiscountCodeCart = {
      action: 'addDiscountCode',
      code: data.discount.toUpperCase(),
    };
    const queryObj: IUpdateCartApiObjectRequest = {
      cartId,
      token: accessToken,
      data: { version: cartVersion, actions: [actionObject] },
    };
    updateCart(queryObj);
  };
  return (
    <Box component={'form'} width={'100%'} onSubmit={handleSubmit(submitHandler)}>
      <Grid container mt={4} height={30}>
        <Grid item xs={9}>
          <Controller
            render={({ field }) => (
              <TextField {...field} fullWidth size="small" label="Promo Code" />
            )}
            name={'discount'}
            control={control}
            defaultValue={''}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{ backgroundColor: 'beige' }}
            color="success"
            variant="outlined"
            type={'submit'}
            disabled={isLoading}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
      {isError && error && <Alert severity="error">This discount code is not available</Alert>}
    </Box>
  );
};
export default BasketDiscountForm;
