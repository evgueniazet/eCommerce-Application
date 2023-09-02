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
import styles from './UserPage.module.scss';

export const UserData: FC = () => {
  const firstName = useAppSelector(getMyCustomerFirstName);
  const lastName = useAppSelector(getMyCustomerLastName);
  const birthDate = useAppSelector(getMyCustomerDateOfBirth);
  const email = useAppSelector(getMyCustomerEmail);

  const [changingFirstName, setChangingFirstName] = useState(firstName);
  const [changingLastName, setChangingLastName] = useState(lastName);
  const [changingBirthDate, setChangingBirthDate] = useState(birthDate);
  const [changingEmail, setChangingEmail] = useState(email);
  const [isEditableArray, setIsEditableArray] = useState([false, false, false, false]);

  const handleEditClick = (index: number) => {
    const newIsEditableArray = [...isEditableArray];
    newIsEditableArray[index] = !newIsEditableArray[index];
    setIsEditableArray(newIsEditableArray);
  };

  return (
    <Box sx={{ width: 450, margin: '0 auto' }}>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="First Name"
          autoComplete="off"
          value={changingFirstName}
          onChange={(e) => {
            if (isEditableArray[0]) {
              setChangingFirstName(e.target.value);
            }
          }}
          InputProps={{
            readOnly: !isEditableArray[0],
            className: !isEditableArray[0] ? styles.non__editable : '',
          }}
          disabled={!isEditableArray[0]}
        />
        <Button onClick={() => handleEditClick(0)}>
          <EditIcon className={!isEditableArray[0] ? styles.non__editable__icon : ''} />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Last Name"
          autoComplete="off"
          value={changingLastName}
          onChange={(e) => {
            if (isEditableArray[1]) {
              setChangingLastName(e.target.value);
            }
          }}
          InputProps={{
            readOnly: !isEditableArray[1],
            className: !isEditableArray[1] ? styles.non__editable : '',
          }}
          disabled={!isEditableArray[1]}
        />
        <Button onClick={() => handleEditClick(1)}>
          <EditIcon className={!isEditableArray[1] ? styles.non__editable__icon : ''} />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          type="date"
          label="Date of birth"
          autoComplete="off"
          value={changingBirthDate}
          onChange={(e) => {
            if (isEditableArray[2]) {
              setChangingBirthDate(e.target.value);
            }
          }}
          InputProps={{
            readOnly: !isEditableArray[2],
            className: !isEditableArray[2] ? styles.non__editable : '',
          }}
          disabled={!isEditableArray[2]}
        />
        <Button onClick={() => handleEditClick(2)}>
          <EditIcon className={!isEditableArray[2] ? styles.non__editable__icon : ''} />
        </Button>
      </Grid>
      <Grid item xs={12} mt={2} sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Email"
          type="text"
          autoComplete="off"
          value={changingEmail}
          onChange={(e) => {
            if (isEditableArray[3]) {
              setChangingEmail(e.target.value);
            }
          }}
          InputProps={{
            readOnly: !isEditableArray[3],
            className: !isEditableArray[3] ? styles.non__editable : '',
          }}
          disabled={!isEditableArray[3]}
        />
        <Button onClick={() => handleEditClick(3)}>
          <EditIcon className={!isEditableArray[3] ? styles.non__editable__icon : ''} />
        </Button>
      </Grid>
    </Box>
  );
};
