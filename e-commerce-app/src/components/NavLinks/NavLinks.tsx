import React, { JSX } from 'react';
import { navigationRoutes } from '../../routes/navigation';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const NavLinks = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      {Object.entries(navigationRoutes).map(([title, path]) => (
        <Button key={title} onClick={() => navigate(path)} sx={{ my: 2, color: 'green', display: 'block' }}>
          {title}
        </Button>
      ))}
    </>
  );
};
export default NavLinks;
