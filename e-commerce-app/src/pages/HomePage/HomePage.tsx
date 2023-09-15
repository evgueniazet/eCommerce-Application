import React from 'react';
import { useAppSelector } from '../../store/hooks';
import Container from '@mui/material/Container';
import styles from './HomePage.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Icon1 from '../../assets/HomePageImg/promoIcon1.png';
import Icon2 from '../../assets/HomePageImg/promoIcon2.png';
import Icon3 from '../../assets/HomePageImg/promoIcon3.png';

export const HomePage: React.FC = () => {
  const { email } = useAppSelector((state) => state.user);
  return (
    <Container component="div" className={styles.homePage}>
      <Box className={styles.banner}>
        <Typography component="p" paragraph>
          Hello, {email ? email : 'Stranger.'} <br /> Can I call you a Friend?
        </Typography>
      </Box>
      <Container className={styles.promoContainer}>
        <Typography variant="h4" className={styles.promoTitle}>
          Active Promo Codes
        </Typography>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Avatar alt="Promo1" src={Icon1} className={styles.avatar} />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Coupon Code #1
                </Typography>
                <Typography className={styles.code} variant="h5" component="div">
                  XXX-XXX-XX
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Copy the code above and paste at checkout
                </Typography>
                <Typography variant="body2" color="red">
                  10% Discount
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Avatar alt="Promo2" src={Icon2} className={styles.avatar} />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Coupon Code #2
                </Typography>
                <Typography className={styles.code} variant="h5" component="div">
                  XXX-XXX-XX
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Copy the code above and paste at checkout
                </Typography>
                <Typography variant="body2" color="red">
                  30% Discount
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Avatar alt="Promo3" src={Icon3} className={styles.avatar} />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Coupon Code #3
                </Typography>
                <Typography className={styles.code} variant="h5" component="div">
                  XXX-XXX-XX
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Copy the code above and paste at checkout
                </Typography>
                <Typography variant="body2" color="red">
                  50% Discount
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Grid container className={styles.infoContainer} spacing={2}>
        <Grid item className={styles.infoImage} xs={12} sm={7} md={6}></Grid>
        <Grid item xs={12} sm={7} md={6}>
          <Box>
            <Typography className={styles.info_title}>We offer Plants Delivery</Typography>
            <Typography component="p" className={styles.info_text}>
              Make celebrations particularly special by sending a friend or family member one of our
              select plants with a personalized message! You can never go wrong with sending one of
              our best sellers to show just how much you care. They can mark the occasion and serve
              as a lasting reminder of the event. Certain plants may also have cultural or symbolic
              significance, making them even more meaningful as gifts for specific celebrations.
              Unlike cut flowers that wither within days, plants are long-lasting gifts that can
              continue to grow and thrive for months or even years with proper care. Make sure to
              point them in the direction of our catalog page that cover almost all of the plants we
              have in stock.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
