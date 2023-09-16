import React, { JSX, useEffect, useState } from 'react';
import styles from './PromoCodes.module.scss';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Icon1 from '../../assets/HomePageImg/promoIcon1.png';
import Icon2 from '../../assets/HomePageImg/promoIcon2.png';
import Icon3 from '../../assets/HomePageImg/promoIcon3.png';
import Container from '@mui/material/Container';
import PromoCard from '../PromoCard/PromoCard';
import { useLazyGetDiscountCodesQuery } from '../../api/discountCodesApi';
import { useAppSelector } from '../../store/hooks';
import { getAccessToken } from '../../store/slices/userSlice';

const initialData = {
  code: 'XXX-XXX-XX',
  description: 'Discount code will be here'
};

const icons = [Icon1, Icon2, Icon3];

const PromoCodes = (): JSX.Element => {
  const accessToken = useAppSelector(getAccessToken) as string;
  const [getDiscountCodes ,{data, isSuccess}] = useLazyGetDiscountCodesQuery();

  const [discounts, setDiscounts] = useState([initialData, initialData, initialData]);

  useEffect(() => {
    if (accessToken) {
      getDiscountCodes(accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isSuccess && data) {
      const discountsArray = data.results.slice(0, 3).map(discount => ({
        code: discount.code,
        description: discount.description.en,
      }));
      console.log(discountsArray);
      setDiscounts(discountsArray);
    }
  }, [isSuccess]);


  return (
    <Container className={styles.promo}>
      <Typography variant="h4" className={styles.promo__title}>
        Active Promo Codes
      </Typography>
      <Grid container spacing={4} textAlign="center">
        {discounts.map((discount, idx) => (
          <Grid item xs={12} sm={6} md={4} key={discount.code+idx}>
            <PromoCard avatarSrc={icons[idx]} code={discount.code} description={discount.description} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
export default PromoCodes;
