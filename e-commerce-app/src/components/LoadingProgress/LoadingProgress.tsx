import React, { JSX } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoadingProgress = (): JSX.Element => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };
  return (
    <Backdrop open={open} onClick={handleClose}>
      <CircularProgress color="success"/>
    </Backdrop>
  );
};
export default LoadingProgress;
