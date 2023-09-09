import React, { JSX, useId } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import { useAppSelector } from '../../store/hooks';
import { getLoggedIn } from '../../store/slices/userSlice';
import MenuLinks from '../MenuLinks/MenuLinks';
import { userLoginRoutes, userLogoutRoutes } from '../../routes/navigation';
import { green } from '@mui/material/colors';

const UserMenu = (): JSX.Element => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const menuId = useId();

  const isLoggedIn = useAppSelector(getLoggedIn);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: isLoggedIn ? green[700] : '' }}>
            <PersonIcon />
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id={menuId}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuLinks
          navigation={isLoggedIn ? userLogoutRoutes : userLoginRoutes}
          handler={handleCloseUserMenu}
        />
      </Menu>
    </Box>
  );
};
export default UserMenu;
