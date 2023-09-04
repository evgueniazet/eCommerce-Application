import React, { useState } from 'react';
import PageImg from '../../assets/images/UserPageImg.png';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { UserData } from './UserData';
import { UserAddresses } from './UserAddresses';
import { useValidate } from '../../hooks/useValidate';
import { IRegistrationFormData } from '../../interfaces/IRegistrationFormData';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import { fieldNameType, globalErrors } from '../../types';
import { IValues } from '../../interfaces/IValues';
import { useAppSelector } from '../../store/hooks';
import {
  getMyCustomerFirstName,
  getMyCustomerLastName,
  getMyCustomerDateOfBirth,
  getMyCustomerEmail,
  getMyCustomerAddresses,
  getMyCustomerShippingAddressIds,
  getMyCustomerBillingAddressIds,
  getMyCustomerDefaultShippingAddressId,
  getMyCustomerDefaultBillingAddressId,
  getMyCustomerPassword,
  getMyCustomerVersion,
} from '../../store/slices/myCustomerSlice';
import { useUpdateMyCustomerMutation } from '../../api/myCustomerApi';
import { getAccessToken } from '../../store/slices/userSlice';
import { IUpdateMyCustomer } from '../../store/slices/updateMyCustomerTypes/updateMyCustomerTypes';
import {
  IMakeUpdateMyCustomerPersonalQueryObject
} from '../../types/utilsTypes/IMakeUpdateMyCustomerPersonalQueryActions';
import {
  makeUpdateMyCustomerPersonalQueryActions
} from '../../utils/updateMyCustomerUtils/makeUpdateMyCustomerPersonalQueryActions';
import { capitalizeString } from '../../utils/capitalizeString';
import UserPersonalHeader from '../../components/UserPersonalHeader/UserPersonalHeader';
import UserPersonalRow from '../../components/UserPersonalRow/UserPersonalRow';
import UserPersonalAddressTab from '../../components/UserPersonalAddressTab/UserPersonalAddressTab';
import UserPersonalAddAddress from '../../components/UserPersonalAddAddress/UserPersonalAddAddress';
import TextField from '@mui/material/TextField';
import { UserPassword } from './UserPassword';

const steps = ['Personal information', 'Shipping/Billing address', 'Change password'];

export const UserPage: React.FC = () => {
  const firstName = useAppSelector(getMyCustomerFirstName);
  const lastName = useAppSelector(getMyCustomerLastName);
  const birthDate = useAppSelector(getMyCustomerDateOfBirth);
  const email = useAppSelector(getMyCustomerEmail);
  const addresses = useAppSelector(getMyCustomerAddresses);
  const shippingAddressId = useAppSelector(getMyCustomerShippingAddressIds);
  const billingAddressId = useAppSelector(getMyCustomerBillingAddressIds);
  const shippingDefaultAddressId = useAppSelector(getMyCustomerDefaultShippingAddressId);
  const billingDefaultAddressId = useAppSelector(getMyCustomerDefaultBillingAddressId);
  const password = useAppSelector(getMyCustomerPassword);
  const myCustomerVersion = useAppSelector(getMyCustomerVersion);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const { errors: validationErrors, validateField } = useValidate();

  const accessToken = useAppSelector(getAccessToken) as string;
  const [updateMyCustomer] = useUpdateMyCustomerMutation();

  const initialUserBio: IMakeUpdateMyCustomerPersonalQueryObject = {
    firstName,
    lastName,
    birthDate,
    email,
  };

  const billingAddresses = addresses.filter((address) => billingAddressId.includes(address.id));
  const shippingAddresses = addresses.filter((address) => shippingAddressId.includes(address.id));

  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset: resetForm,
  } = useForm<IRegistrationFormData>();

  const [activeAddressTab, setActiveAddressTab] = useState(0);
  const mediumViewport = useMediaQuery('(min-width:900px)');
  const handleAddressTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveAddressTab(newValue);
  };

  const [openEditBio, setOpenEditBio] = React.useState(false);

  const handleClickOpenEditBio = () => {
    setOpenEditBio(true);
  };

  const handleCloseClickCloseEditBio = () => {
    setOpenEditBio(false);
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const globalErrors = Object.keys(validationErrors).reduce<globalErrors<IRegistrationFormData>>(
    (acc, item) => {
      if (validationErrors[item as keyof IRegistrationFormData]) {
        acc[item as keyof IRegistrationFormData] = {
          message: validationErrors[item as keyof IRegistrationFormData],
        };
      }

      if (
        formState.errors[item as keyof FieldErrors<IRegistrationFormData>] &&
        !validationErrors[item as keyof IRegistrationFormData]
      ) {
        acc[item as keyof IRegistrationFormData] = {
          message:
            formState.errors[item as keyof FieldErrors<IRegistrationFormData>]?.message ?? null,
        };
      }

      return acc;
    },
    {},
  );

  const validationHandler = (fieldName: fieldNameType, value: string, values?: IValues): void => {
    if (!value) {
      const updatedErrors = {
        ...validationErrors,
        [fieldName]: '',
      };

      clearErrors(fieldName);
      Object.assign(validationErrors, updatedErrors);
      return;
    }

    const errString = validateField(fieldName, value, values);

    if (errString.length) {
      setError(fieldName, {
        type: 'required',
        message: errString,
      });
    } else {
      clearErrors(fieldName);
    }
  };

  const onSubmitPersonal: SubmitHandler<IRegistrationFormData> = (data) => {
    if (Object.keys(globalErrors).length) {
      return;
    }

    const initialPersonalData: IMakeUpdateMyCustomerPersonalQueryObject = {
      firstName,
      lastName,
      email,
      birthDate,
    };

    const currentPersonalData: Partial<IMakeUpdateMyCustomerPersonalQueryObject> = {
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      email: data.email || undefined,
      birthDate: data.birthDate || undefined,
    };

    const actionsArray = makeUpdateMyCustomerPersonalQueryActions(
      initialPersonalData,
      currentPersonalData,
    );

    const updateData: IUpdateMyCustomer = {
      version: myCustomerVersion,
      actions: actionsArray,
    };
    updateMyCustomer({
      token: accessToken,
      data: updateData,
    }).then((a) => {
      console.log(a);
    });
  };

  const onResetPersonal = () => {
    setValue('firstName', firstName);
    setValue('lastName', lastName);
    setValue('birthDate', birthDate);
    setValue('email', email);
  };

  const userData = [firstName, lastName, birthDate, email];

  const userAddresses = [
    addresses,
    shippingAddressId,
    billingAddressId,
    shippingDefaultAddressId,
    billingDefaultAddressId,
  ];

  return (
    <>
      <Box pt={5}>
        <CssBaseline/>
        <Grid container
              spacing={3}>
          <Grid item
                md={2}
                sx={{ display: { xs: 'none', md: 'block' } }}>
            <img src={PageImg}
                 alt="Personal page"
                 width={'100%'}/>
          </Grid>
          <Grid item
                md={8}
                xs={12}>
            <Stack spacing={5}>
              <Typography component={'span'}
                          variant="h3"
                          textAlign={'center'}>
                Hello, {capitalizeString(firstName)}!
              </Typography>

              <Divider/>
              <Box>
                <Stack spacing={0.5}>
                  <UserPersonalHeader title="Personal information"
                                      icon={<PersonIcon/>}/>
                  <UserPersonalRow title="First Name:"
                                   value={firstName}/>
                  <UserPersonalRow title="Last Name:"
                                   value={lastName}/>
                  <UserPersonalRow
                    title="Date of Birth:"
                    value={new Date(birthDate).toDateString()}
                  />
                  <UserPersonalRow title="Email:"
                                   value={email}/>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon/>}
                    >
                      <Typography>Edit Personal Info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box component={'form'}
                           onSubmit={handleSubmit(onSubmitPersonal)}>
                        <UserData
                          register={register}
                          validationHandler={validationHandler}
                          errors={globalErrors}
                          userData={userData}
                          setValue={setValue}
                          getValues={getValues}
                        />
                        <Box sx={{ width: '100%', display: 'flex', pt: 4, gap: '30%' }}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ backgroundColor: 'mediumaquamarine', color: 'black' }}
                          >
                            Update
                          </Button>
                          <Button
                            type="reset"
                            onClick={onResetPersonal}
                            fullWidth
                            variant="contained"
                            sx={{ backgroundColor: 'beige', color: 'black' }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon/>}>
                      <Typography>Reset Password</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <UserPassword/>

                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </Box>

              <Divider/>

              <Box>
                <Stack spacing={0.5}>
                  <UserPersonalHeader title="Contact information"
                                      icon={<ContactsIcon/>}/>
                  <Box>
                    <UserPersonalAddressTab
                      addresses={addresses}
                      index={0}
                      value={activeAddressTab}
                    />
                  </Box>

                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon/>}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Add New Address</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <UserPersonalAddAddress/>
                      <UserAddresses
                        register={register}
                        validationHandler={validationHandler}
                        errors={globalErrors}
                        userAddresses={userAddresses}
                        setValue={setValue}
                        getValues={getValues}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      {/* <Grid container */}
      {/*       sx={{ height: '100vh' }}> */}
      {/*   <Container component="main" */}
      {/*              maxWidth="md"> */}
      {/*     <CssBaseline/> */}
      {/*     <Box */}
      {/*       component="form" */}
      {/*       noValidate */}
      {/*       onSubmitPersonal={handleSubmit(onSubmitPersonal)} */}
      {/*       className="wrapper" */}
      {/*       sx={{ mt: '20%' }} */}
      {/*     > */}
      {/*       <Stepper activeStep={activeStep} */}
      {/*                alternativeLabel> */}
      {/*         {steps.map((label, index) => { */}
      {/*           const stepProps: { completed?: boolean } = {}; */}

      {/*           if (isStepSkipped(index)) { */}
      {/*             stepProps.completed = false; */}
      {/*           } */}
      {/*           return ( */}
      {/*             <Step key={label} {...stepProps}> */}
      {/*               <StepLabel>{label}</StepLabel> */}
      {/*             </Step> */}
      {/*           ); */}
      {/*         })} */}
      {/*       </Stepper> */}
      {/*       {activeStep === steps.length ? ( */}
      {/*         <Box> */}
      {/*           <Typography sx={{ mt: 2, mb: 1 }}> */}
      {/*             All pages completed - you&apos;re updated */}
      {/*           </Typography> */}
      {/*           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}> */}
      {/*             <Box sx={{ flex: '1 1 auto' }}/> */}
      {/*             <Button onClick={handleReset}>Reset</Button> */}
      {/*           </Box> */}
      {/*         </Box> */}
      {/*       ) : ( */}
      {/*         <Box> */}
      {/*           <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}> */}
      {/*             Profile Page {activeStep + 1} */}
      {/*           </Typography> */}
      {/*           <Box */}
      {/*             sx={{ */}
      {/*               marginTop: 8, */}
      {/*               component: 'form', */}
      {/*               display: 'flex', */}
      {/*               flexDirection: 'column', */}
      {/*               alignItems: 'center', */}
      {/*             }} */}
      {/*           ></Box> */}
      {/*           {!!Object.keys(formState.errors).length && ( */}
      {/*             <Box */}
      {/*               style={{ */}
      {/*                 display: 'flex', */}
      {/*                 justifyContent: 'center', */}
      {/*                 alignItems: 'center', */}
      {/*                 height: '100%', */}
      {/*               }} */}
      {/*             > */}
      {/*               <Alert style={{ width: '500px' }} */}
      {/*                      severity={'error'}> */}
      {/*                 Please review and ensure all fields are correctly filled! */}
      {/*               </Alert> */}
      {/*             </Box> */}
      {/*           )} */}
      {/*           {activeStep + 1 === 1 && ( */}

      {/*           )} */}
      {/*           {activeStep + 1 === 2 && ( */}

      {/*           )} */}
      {/*           {activeStep + 1 === 3 && ( */}

      {/*           )} */}
      {/*           <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}> */}
      {/*             <Button */}
      {/*               color="inherit" */}
      {/*               disabled={activeStep === 0} */}
      {/*               onClick={handleBack} */}
      {/*               sx={{ mt: 2 }} */}
      {/*             > */}
      {/*               Back */}
      {/*             </Button> */}
      {/*             <Box sx={{ flex: '1 1 auto' }}/> */}
      {/*             <Button onClick={handleNext}> */}
      {/*               {activeStep === steps.length - 1 ? 'Done' : 'Next'} */}
      {/*             </Button> */}
      {/*           </Box> */}
      {/*           <Box sx={{ width: '100%', display: 'flex', pt: 4, gap: '30%' }}> */}
      {/*             <Button */}
      {/*               type="submit" */}
      {/*               onClick={buttonSubmitClick} */}
      {/*               fullWidth */}
      {/*               variant="contained" */}
      {/*               sx={{ backgroundColor: 'mediumaquamarine', color: 'black' }} */}
      {/*             > */}
      {/*               Update */}
      {/*             </Button> */}
      {/*             <Button */}
      {/*               type="submit" */}
      {/*               fullWidth */}
      {/*               variant="contained" */}
      {/*               sx={{ backgroundColor: 'beige', color: 'black' }} */}
      {/*             > */}
      {/*               Cancel */}
      {/*             </Button> */}
      {/*           </Box> */}
      {/*         </Box> */}
      {/*       )} */}
      {/*     </Box> */}
      {/*   </Container> */}
      {/* </Grid> */}
    </>
  );
};
