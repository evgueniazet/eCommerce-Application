import React, { FC, JSX } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface IMenuLinksProps {
  navigation: {
    [K: string]: string;
  };
  handler: () => void;
}

const MenuLinks: FC<IMenuLinksProps> = ({ navigation, handler }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      {Object.entries(navigation).map(([title, path]) => (
        <MenuItem key={title} onClick={handler}>
          <Button fullWidth onClick={() => navigate(path)} sx={{ color: 'green' }}>
            {title}
          </Button>
        </MenuItem>
      ))}
    </>
  );
};
export default MenuLinks;
