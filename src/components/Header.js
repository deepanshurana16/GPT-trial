import React from 'react';
import { Grid, Typography } from '@mui/material';

function Header() {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ backgroundColor: '#729762', py: 2, width: '100%' }}>
      <Typography variant="h4" color="textPrimary">
        Mental Health Support
      </Typography>
    </Grid>
  );
}

export default Header;
