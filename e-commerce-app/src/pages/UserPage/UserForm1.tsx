import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../store/hooks';
import {
  getMyCustomerFirstName,
  getMyCustomerLastName,
  getMyCustomerDateOfBirth,
  getMyCustomerEmail,
} from '../../store/slices/myCustomerSlice';

export const UserForm1: FC = () => {
  const firstName = useAppSelector(getMyCustomerFirstName);
  const lastName = useAppSelector(getMyCustomerLastName);
  const birthDate = useAppSelector(getMyCustomerDateOfBirth);
  const email = useAppSelector(getMyCustomerEmail);

  const [changingFirstName, setChangingFirstName] = useState(firstName);
  const [changingLastName, setChangingLastName] = useState(lastName);
  const [changingBirthDate, setChangingBirthDate] = useState(birthDate);
  const [changingEmail, setChangingEmail] = useState(email);

  return (
    <Box sx={{ width: 450, margin: '0 auto' }}>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="First Name"
          autoComplete="off"
          value={changingFirstName}
          onChange={(e) => setChangingFirstName(e.target.value)}
        />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Last Name"
          autoComplete="off"
          value={changingLastName}
          onChange={(e) => setChangingLastName(e.target.value)}
        />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          type="date"
          label="Date of birth"
          autoComplete="off"
          value={changingBirthDate}
          onChange={(e) => setChangingBirthDate(e.target.value)}
        />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Email"
          type="text"
          autoComplete="off"
          value={changingEmail}
          onChange={(e) => setChangingEmail(e.target.value)}
        />
        <Button>
          <EditIcon />
        </Button>
      </Grid>
    </Box>
  );
};
