import { FC } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { Divider, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import CartAddLineItem from '../../requestsComponents/CartAddLineItem/CartAddLineItem';
import CartModifyQuantity from '../../requestsComponents/CartModifyQuantity/CartModifyQuantity';
import { styled } from '@mui/material/styles';
import { ICartLineItem } from '../../types/slicesTypes/cart';
import { Link } from 'react-router-dom';
import styles from './BasketLineItem.module.scss';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface IBasketLineItemProps {
  item: ICartLineItem;
}

const BasketLineItem: FC<IBasketLineItemProps> = ({ item }) => {
  const currencyEUR = item.price.value.currencyCode;
  const numberEUR = item.price.value.centAmount / 10 ** item.price.value.fractionDigits;
  const priceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyEUR,
  }).format(numberEUR);

  let discountedNumberEUR = numberEUR;
  if (item.price.discounted) {
    discountedNumberEUR =
      item.price.discounted.value.centAmount / 10 ** item.price.discounted.value.fractionDigits;
  }
  if (item.discountedPrice) {
    discountedNumberEUR =
      item.discountedPrice.value.centAmount / 10 ** item.discountedPrice.value.fractionDigits;
  }
  const discountedPriceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyEUR,
  }).format(discountedNumberEUR);

  const totalCurrencyEUR = item.totalPrice.currencyCode;

  const subTotalNumberEUR =
    (item.price.value.centAmount * item.quantity) / 10 ** item.price.value.fractionDigits;
  const subTotalPriceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: totalCurrencyEUR,
  }).format(subTotalNumberEUR);

  const totalNumberEUR = item.totalPrice.centAmount / 10 ** item.totalPrice.fractionDigits;
  const totalPriceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: totalCurrencyEUR,
  }).format(totalNumberEUR);

  return (
    <>
      <Grid container spacing={2} textAlign="start" my={4}>
        <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Box sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={item.variant.images[0].url} />
          </Box>
        </Grid>
        <Grid item xs={12} sm>
          <Stack spacing={5}>
            <Grid container>
              <Grid item xs={6} container direction="column" spacing={2} alignSelf="center" pl={2}>
                <Stack spacing={2}>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {item.name.en}
                  </Typography>
                  <Link to={`/products/${item.productId}`} style={{ textDecoration: 'none' }}>
                    <Typography variant="body2">More Details...</Typography>
                  </Link>
                </Stack>
              </Grid>

              <Grid item xs={2} alignSelf="center">
                {discountedNumberEUR !== numberEUR ? (
                  <>
                    <Typography
                      className={styles.price__marked}
                      variant="subtitle1"
                      component="p"
                      fontWeight={500}
                    >
                      {discountedPriceEUR}
                    </Typography>
                    <Typography
                      className={styles.price__sale}
                      variant="subtitle1"
                      component="p"
                      fontWeight={500}
                    >
                      {priceEUR}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="subtitle1" component="p" fontWeight={500}>
                    {priceEUR}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={2.8} alignSelf="center" display="flex">
                <CartModifyQuantity productId={item.productId} />
              </Grid>

              <Grid item xs={1.2} alignSelf="center">
                {subTotalNumberEUR !== totalNumberEUR ? (
                  <>
                    <Typography
                      className={styles.price__marked}
                      variant="subtitle1"
                      component="p"
                      fontWeight={700}
                    >
                      {totalPriceEUR}
                    </Typography>
                    <Typography
                      className={styles.price__sale}
                      variant="subtitle1"
                      component="p"
                      fontWeight={700}
                    >
                      {subTotalPriceEUR}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="subtitle1" component="p" fontWeight={700}>
                    {totalPriceEUR}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <CartAddLineItem
              productId={item.productId}
              props={{ variant: 'text', color: 'warning' }}
            />
          </Stack>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
export default BasketLineItem;
