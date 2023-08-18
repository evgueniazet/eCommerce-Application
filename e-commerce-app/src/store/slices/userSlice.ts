import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserFromSlice } from '../../types/slicesTypes/userSliceTypes';

const initialState: IUserFromSlice = {
  email: null,
  password: null,
  access_token: null,
  refresh_token: null,
  isLoggedIn: false,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: () => initialState,
    setAuth: (state, action: PayloadAction<Partial<IUserFromSlice>>) => {
      state.email = action.payload.email ? action.payload.email : state.email;
      state.password = action.payload.password ? action.payload.password : state.password;
      state.access_token = action.payload.access_token ? action.payload.access_token : state.access_token;
      state.refresh_token = action.payload.refresh_token ? action.payload.refresh_token : state.refresh_token;
      state.isLoggedIn = true;
    },
    setLogIn: (state) => {
      state.isLoggedIn = true;
    },
    setAnonymousAuth: (state, action: PayloadAction<Pick<IUserFromSlice, 'access_token'>>) => {
      state.access_token = action.payload.access_token;
      state.email = null;
      state.password = null;
      state.refresh_token = null;
    },
  },
});

export default userSlice.reducer;

export const { logout, setAuth, setLogIn, setAnonymousAuth } = userSlice.actions;
