import React from 'react';
import './AboutPage.module.scss';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';
import Ilya from '../../assets/AboutPageImg/Ilya.jpeg';
import Evguenia from '../../assets/AboutPageImg/Evguenia.jpeg';
import Nargiza from '../../assets/AboutPageImg/Nargiza.jpg';

export const AboutPage: React.FC = () => {
  return (
    <Container>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h5"
            variant="h3"
            align="center"
            color="green"
            fontWeight="500"
            gutterBottom
          >
            About Us
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            We&apos;re on a mission to complete <br /> eCommerce Application successfully.
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Button variant="contained">Join RS School</Button>
            <Button variant="outlined">Team&apos;s mentor</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px">
                <Avatar alt="Ilya" src={Ilya} sx={{ width: 56, height: 56 }} />
                <Link href="https://github.com/LikeKugi" target="_blank">
                  <GitHubIcon color="disabled" fontSize="large" />
                </Link>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  Ilya Shcherbakov
                </Typography>
                <Typography fontSize={14} mb={3}>
                  Front-end developer
                </Typography>
                <Divider variant="middle" />
                <Typography color="grey" fontSize={12} mt={1.5}>
                  Python developer, meme creator, great sense of humor.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px">
                <Avatar alt="Evguenia" src={Evguenia} sx={{ width: 56, height: 56 }} />
                <Link href="https://github.com/evgueniazet" target="_blank">
                  <GitHubIcon color="disabled" fontSize="large" />
                </Link>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  Evguenia Zelenko
                </Typography>
                <Typography fontSize={14} mb={3}>
                  Front-end developer
                </Typography>
                <Divider variant="middle" />
                <Typography color="grey" fontSize={12} mt={1.5}>
                  Spotify lover, strong motivator, always positive.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px">
                <Avatar alt="Nargiza" src={Nargiza} sx={{ width: 56, height: 56 }} />
                <Link href="https://github.com/Nargiza14" target="_blank">
                  <GitHubIcon color="disabled" fontSize="large" />
                </Link>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  Nargiza Ruzieva
                </Typography>
                <Typography fontSize={14} mb={3}>
                  Front-end developer
                </Typography>
                <Divider variant="middle" />
                <Typography color="grey" fontSize={12} mt={1.5}>
                  Mother-of-three, karaoke lover, quet person.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};
