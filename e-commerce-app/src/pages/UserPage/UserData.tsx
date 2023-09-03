import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { FC, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import styles from './UserPage.module.scss';
import { IUserProps } from '../../interfaces/IUserProps';

export const UserData: FC<IUserProps> = ({
  register,
  validationHandler,
  errors,
  userData,
  setValue,
}) => {
  const [firstName, lastName, birthDate, email] = userData;

  const [isEditableArray, setIsEditableArray] = useState([false, false, false, false]);

  const [inputValues, setInputValues] = useState({
    firstName: userData[0],
    lastName: userData[1],
    birthDate: userData[2],
    email: userData[3],
  });

  const handleInputChange = (field: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [field]: value,
    }));
  };

  useEffect(() => {
    setValue('firstName', inputValues.firstName);
    setValue('lastName', inputValues.lastName);
    setValue('birthDate', inputValues.birthDate);
    setValue('email', inputValues.email);
  }, [inputValues, setValue]);

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
          value={inputValues.firstName}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register('firstName', {
            required: 'First Name is required',
            onChange: (e) => {
              const newValue = e.target.value;
              handleInputChange('firstName', newValue);
              if (isEditableArray[0] && newValue !== inputValues.firstName) {
                validationHandler('firstName', newValue);
              }
            },
          })}
          InputProps={{
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
          value={inputValues.lastName}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register('lastName', {
            required: 'Last Name is required',
            onChange: (e) => {
              const newValue = e.target.value;
              handleInputChange('lastName', newValue);
              if (isEditableArray[1] && newValue !== inputValues.lastName) {
                validationHandler('lastName', newValue);
              }
            },
          })}
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
          value={inputValues.birthDate}
          error={!!errors.birthDate}
          helperText={errors.birthDate?.message}
          {...register('birthDate', {
            required: 'Birth Date is required',
            onChange: (e) => {
              const newValue = e.target.value;
              handleInputChange('birthDate', newValue);
              if (isEditableArray[2] && newValue !== inputValues.birthDate) {
                validationHandler('birthDate', newValue);
              }
            },
          })}
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
          value={inputValues.email}
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            onChange: (e) => {
              const newValue = e.target.value;
              handleInputChange('email', newValue);
              if (isEditableArray[3] && newValue !== inputValues.email) {
                validationHandler('email', newValue);
              }
            },
          })}
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
