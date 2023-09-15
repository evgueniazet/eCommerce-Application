import React from 'react';
import styles from './BreadCrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const matchRoutes = location.pathname
    .split('/')
    .filter(Boolean)
    .map((route) => decodeURIComponent(route));

  return <Box className={'styles.breadcrumbs - container'}></Box>;
};
