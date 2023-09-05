import { IMyCustomerBaseResponse } from '../../types/slicesTypes/myCustomerApiSliceTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';

const initialState: IMyCustomerBaseResponse = {
  addresses: [],
  authenticationMode: 'Password',
  billingAddressIds: [],
  dateOfBirth: '',
  email: '',
  firstName: '',
  id: '',
  isEmailVerified: false,
  lastName: '',
  password: '',
  shippingAddressIds: [],
};

const myCustomerSlice = createSlice({
  initialState,
  name: 'myCustomerSlice',
  reducers: {
    clearMyCustomerData: (state) => {
      state.addresses.length = 0;
      state.authenticationMode = 'Password';
      state.billingAddressIds.length = 0;
      state.dateOfBirth = '';
      state.email = '';
      state.firstName = '';
      state.id = '';
      state.isEmailVerified = false;
      state.lastName = '';
      state.password = '';
      state.shippingAddressIds.length = 0;
      if (state.defaultBillingAddressId) {
        delete state.defaultBillingAddressId;
      }
      if (state.defaultShippingAddressId) {
        delete state.defaultShippingAddressId;
      }
    },
    setMyCustomerData: (state, action: PayloadAction<IMyCustomerBaseResponse>) => {
      state.addresses = action.payload.addresses;
      state.authenticationMode = action.payload.authenticationMode;
      state.billingAddressIds = action.payload.billingAddressIds;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.id = action.payload.id;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.lastName = action.payload.lastName;
      state.password = action.payload.password;
      state.shippingAddressIds = action.payload.shippingAddressIds;
      if (action.payload.defaultBillingAddressId) {
        state.defaultBillingAddressId = action.payload.defaultBillingAddressId;
      }
      if (action.payload.defaultShippingAddressId) {
        state.defaultShippingAddressId = action.payload.defaultShippingAddressId;
      }
    },
  },
});

export const getMyCustomerAddresses = (state: RootStateType) => state.myCustomer.addresses;
export const getMyCustomerBillingAddressIds = (state: RootStateType) =>
  state.myCustomer.billingAddressIds;
export const getMyCustomerDateOfBirth = (state: RootStateType) => state.myCustomer.dateOfBirth;
export const getMyCustomerEmail = (state: RootStateType) => state.myCustomer.email;
export const getMyCustomerFirstName = (state: RootStateType) => state.myCustomer.firstName;
export const getMyCustomerId = (state: RootStateType) => state.myCustomer.id;
export const getMyCustomerIsEmailVerified = (state: RootStateType) =>
  state.myCustomer.isEmailVerified;
export const getMyCustomerLastName = (state: RootStateType) => state.myCustomer.lastName;
export const getMyCustomerPassword = (state: RootStateType) => state.myCustomer.password;
export const getMyCustomerShippingAddressIds = (state: RootStateType) =>
  state.myCustomer.shippingAddressIds;
export const getMyCustomerDefaultBillingAddressId = (state: RootStateType) =>
  state.myCustomer.defaultBillingAddressId;
export const getMyCustomerDefaultShippingAddressId = (state: RootStateType) =>
  state.myCustomer.defaultShippingAddressId;

export const MyCustomerReducer = myCustomerSlice.reducer;
export const { clearMyCustomerData, setMyCustomerData } = myCustomerSlice.actions;
