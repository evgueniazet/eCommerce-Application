import React, { FC, JSX } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';

interface IMenuLinksProps {
  navigation: {
    [K: string]: string;
  };
  handler: () => void;
}

const MenuLinks: FC<IMenuLinksProps> = ({ navigation, handler }): JSX.Element => {
  return (
    <>
      {Object.entries(navigation).map(([title, path]) => (
        <MenuItem key={title} onClick={handler}>
          <Button href={path} sx={{ color: 'green' }}>
            {title}
          </Button>
        </MenuItem>
      ))}
    </>
  );
};
export default MenuLinks;
