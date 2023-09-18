import { FC } from 'react';
import styles from './ProductCard.module.scss';
import { Box, Typography, CardMedia, CardContent, CardActions, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IProductApiResponse } from '../../types/slicesTypes/productsApiTypes';
import CartAddLineItem from '../../requestsComponents/CartAddLineItem/CartAddLineItem';

interface ICardProps {
  item: IProductApiResponse;
}

export const ProductCard: FC<ICardProps> = ({ item }) => {
  const navigate = useNavigate();

  const clickOnCardHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      navigate(`/products/${item.id}`);
    }
  };

  const imgPath = item.masterData.current.masterVariant.images[0].url;
  const imgDescription = item.masterData.current.name.en;

  const currencyEUR = item.masterData.current.masterVariant.prices[0].value.currencyCode;
  const numberEUR =
    item.masterData.current.masterVariant.prices[0].value.centAmount /
    10 ** item.masterData.current.masterVariant.prices[0].value.fractionDigits;
  let discountEUR = numberEUR;
  if (item.masterData.current.masterVariant.prices[0].discounted) {
    discountEUR =
      item.masterData.current.masterVariant.prices[0].discounted.value.centAmount /
      10 ** item.masterData.current.masterVariant.prices[0].discounted.value.fractionDigits;
  }
  const priceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyEUR,
  }).format(numberEUR);
  const salePriceEUR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyEUR,
  }).format(discountEUR);

  return (
    <Card className={styles.card} onClick={(e) => clickOnCardHandler(e)}>
      <Box width={'100%'}>
        <CardMedia sx={{ height: 200, width: '100%' }} image={imgPath} title={imgDescription} />
      </Box>
      <CardContent className={styles.card__text}>
        <Typography className={styles.card__title} component="h2">
          {item.masterData.current.name.en}
        </Typography>

        {discountEUR !== numberEUR ? (
          <>
            <Typography className={styles.card__price__marked} component="h3">
              {salePriceEUR}
            </Typography>
            <Typography className={styles.card__price__sale} component="h3">
              {priceEUR}
            </Typography>
          </>
        ) : (
          <Typography className={styles.card__price} component="h3">
            {priceEUR}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <CartAddLineItem productId={item.id} props={{ color: 'success', variant: 'outlined' }} />
      </CardActions>
    </Card>
  );
};
