import React from 'react';
import AppointmentForm from '../../../components/AppointmentForm';
import { Grid, Box } from '@mui/material';

const Appointment = ({ theme }) => {
  return (
    <Box sx={{ padding: { xs: '20px', sm: '40px' }, backgroundColor: theme.palette.background.default }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={9} md={10} lg={14}>
          <AppointmentForm theme={theme} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Appointment;
