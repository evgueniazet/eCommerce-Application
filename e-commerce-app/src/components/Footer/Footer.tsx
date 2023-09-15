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
    <Box className={styles.footer} component="footer">
      <Container maxWidth="lg">
        <Grid container className={styles.footer_container} spacing={5} mt={5}>
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
              We are RS-School students, dedicated to providing the best service to our customers.
              <br /> <span className={styles.span}>Hanna Dziahonskaya</span> is a Mentor
              ReactDreamTeam and RSdzen Project.
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
              123 Example Street, EXAMPLE
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
            <Link href="https://www.facebook.com/" target={'_blank'} color="inherit">
              <Facebook />
            </Link>
            <Link href="https://www.instagram.com/" target={'_blank'} color="inherit" sx={{ pl: 1, pr: 1 }}>
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" target={'_blank'} color="inherit">
              <Twitter />
            </Link>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Rolling Scopes School 2023
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box className={styles.footer_img_container}>
        <Box className={styles.footer_img}></Box>
      </Box>
    </Box>
  );
};
