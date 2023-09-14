import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import logo from '../../assets/logo/free-icon-tree-740936.png';
import Menu from '@mui/material/Menu';
import NavLinks from '../NavLinks/NavLinks';
import MenuLinks from '../MenuLinks/MenuLinks';
import { navigationRoutes } from '../../routes/navigation';
import UserMenu from '../UserMenu/UserMenu';
import { Link } from 'react-router-dom';
import UserCart from '../UserCart/UserCart';
import { Grid } from '@mui/material';

export const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" color="default">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={'/'}>
            <img src={logo} alt="logo" width={60} height={60} />
          </Link>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'green',
                textDecoration: 'none',
              }}
            >
              RSdzen
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuLinks navigation={navigationRoutes} handler={handleCloseNavMenu} />
            </Menu>
          </Box>
          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Typography
              variant="h5"
              noWrap
              component="span"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'green',
                textDecoration: 'none',
              }}
            >
              RSdzen
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLinks />
          </Box>

          <Grid container spacing={1} sx={{maxWidth: 'max-content'}}>
            <Grid item>
              <UserCart />
            </Grid>
            <Grid item>
              <UserMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
