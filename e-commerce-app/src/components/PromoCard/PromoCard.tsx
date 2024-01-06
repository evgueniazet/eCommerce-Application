import React, { FC, JSX } from 'react';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import styles from './PromoCard.module.scss';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

interface IPromoCardProps {
  avatarSrc: string;
  code: string;
  description: string;
}

const PromoCard: FC<IPromoCardProps> = ({ avatarSrc, code, description }): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Avatar alt="Promo1" src={avatarSrc} className={styles.card__avatar} />
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Coupon Code #1
        </Typography>
        <Typography className={styles.card__code} variant="h5" component="div">
          {code}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Copy the code above and paste at checkout
        </Typography>
        <Typography variant="body2" color="red">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PromoCard;
