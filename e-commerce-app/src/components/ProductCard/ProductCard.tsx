import { FC } from 'react';
import styles from './ProductCard.module.scss';
import { Box, Typography, Button, CardMedia, CardContent, CardActions, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IProductApiResponse } from '../../types/slicesTypes/productsApiTypes';

interface ICardProps {
  item: IProductApiResponse;
}

export const ProductCard: FC<ICardProps> = ({ item }) => {
  const navigate = useNavigate();
  const handlerNavigation = () => {
    navigate(`/products/${item.id}`);
  };

  const imgPath = item.masterData.current.masterVariant.images[0].url;
  const imgDescription = item.masterData.current.name.en;

  const currencyCommon = item.masterData.current.masterVariant.prices[0].value.currencyCode;
  const priceCommon = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCommon,
  }).format(
    item.masterData.current.masterVariant.prices[0].value.centAmount /
      (10 ** item.masterData.current.masterVariant.prices[0].value.fractionDigits),
  );
  const currencySale = item.masterData.current.masterVariant.prices[1].value.currencyCode;
  const priceSale = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencySale,
  }).format(
    item.masterData.current.masterVariant.prices[1].value.centAmount /
      (10 ** item.masterData.current.masterVariant.prices[1].value.fractionDigits),
  );

  return (
    <Card className={styles.card}>
      <Box width={'100%'}>
        <CardMedia sx={{ height: 200, width: '100%' }} image={imgPath} title={imgDescription} />
      </Box>
      <CardContent className={styles.card__text}>
        <Typography className={styles.card__title} component="h2">
          {item.masterData.current.name.en}
        </Typography>
        <Typography className={styles.card__price} component="h3">
          {priceCommon}
        </Typography>
        <Typography className={styles.card__price} component="h3">
          {priceSale}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handlerNavigation} color="success" variant="outlined">
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};
