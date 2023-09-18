import React, { JSX } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

import styles from './LoadingProgress.module.scss';

const LoadingProgress = (): JSX.Element => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" className={styles.box}>
      <CircularProgress
        size={200}
        thickness={10}
        style={{ width: 200, height: 200, strokeWidth: 10 }}
        data-testid="circular-progress"
      />
      <Typography position="absolute" variant="h4">
        Loading...
      </Typography>
    </Box>
  );
};
export default LoadingProgress;
