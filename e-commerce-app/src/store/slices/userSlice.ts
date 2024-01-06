import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserFromSlice } from '../../types/slicesTypes/userSliceTypes';
import { RootStateType } from '../store';

const initialState: IUserFromSlice = {
  email: null,
  password: null,
  access_token: null,
  refresh_token: null,
  isLoggedIn: false,
  rememberMe: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<IUserFromSlice>>) => {
      state.email = action.payload.email ? action.payload.email : state.email;
      state.password = action.payload.password ? action.payload.password : state.password;
      state.access_token = action.payload.access_token
        ? action.payload.access_token
        : state.access_token;
      state.refresh_token = action.payload.refresh_token
        ? action.payload.refresh_token
        : state.refresh_token;
    },
    setLogIn: (state) => {
      state.isLoggedIn = true;
    },
    setLogOut: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.email = null;
      state.password = null;
      state.isLoggedIn = false;
    },
    setAnonymousAuth: (
      state,
      action: PayloadAction<Pick<IUserFromSlice, 'access_token' | 'refresh_token'>>,
    ) => {
      state.access_token = action.payload.access_token;
      state.email = null;
      state.password = null;
      state.refresh_token = action.payload.refresh_token;
      state.isLoggedIn = false;
    },
    toggleRememberMe: (state, action: PayloadAction<boolean>) => {
      state.rememberMe = action.payload;
    },
  },
});

export const UserReducer = userSlice.reducer;

export const getLoggedIn = (state: RootStateType) => state.user.isLoggedIn;
export const isRememberedMe = (state: RootStateType) => state.user.rememberMe;
export const getRefreshToken = (state: RootStateType) => state.user.refresh_token;
export const getAccessToken = (state: RootStateType) => state.user.access_token;
export const getUserPassword = (state: RootStateType) => state.user.password;
export const getUserEmail = (state: RootStateType) => state.user.email;

export const { setAuth, setLogIn, setLogOut, setAnonymousAuth, toggleRememberMe } =
  userSlice.actions;
