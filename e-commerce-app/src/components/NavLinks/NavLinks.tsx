import React, { JSX } from 'react';
import { navigationRoutes } from '../../routes/navigation';
import Button from '@mui/material/Button';

const NavLinks = (): JSX.Element => {
  return (
    <>
      {Object.entries(navigationRoutes).map(([title, path]) => (
        <Button key={title} href={path} sx={{ my: 2, color: 'green', display: 'block' }}>
          {title}
        </Button>
      ))}
    </>
  );
};
export default NavLinks;
