import React from 'react';
import styles from './Footer.module.scss';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import { Box } from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box data-testid="footer" className={styles.footer} component="footer">
      <Container maxWidth="lg">
        <Grid container className={styles.footer_container} spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography
              className={styles.footer_title}
              variant="h6"
              color="text.primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are RSdzen company, dedicated to providing the best service to our customers.{' '}
              <br /> <span className={styles.span}>Hanna Dziahonskaya</span> CEO and Founder
              ReactDreamTeam and RSdzen Company.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              className={styles.footer_title}
              variant="h6"
              color="text.primary"
              gutterBottom
            >
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, USA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography
              className={styles.footer_title}
              variant="h6"
              color="text.primary"
              gutterBottom
            >
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              <Facebook />
            </Link>
            <Link href="https://www.instagram.com/" color="inherit" sx={{ pl: 1, pr: 1 }}>
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
              <Twitter />
            </Link>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Rolling Scopes School 2023
            </Typography>
          </Grid>
        </Grid>
        <Box className={styles.footer_img_container}>
          <Box className={styles.footer_img}></Box>
        </Box>
      </Container>
    </Box>
  );
};
