export interface IUserFromSlice {
  email: string | null;
  password: string | null;
  access_token: string | null;
  refresh_token: string | null;
  isLoggedIn: boolean;
  rememberMe: boolean;
}
