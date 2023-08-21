export interface IAuthUser {
  user: string;
  password: string;
  accessToken: string | null;
  refreshToken?: string;
}

export interface IRefreshTokenResponse {
  access_token: string;
  expires_at: number;
  expires_in: number;
  scope: string;
  token_type: 'Bearer' | string;
}

export interface ILoginResponse extends IRefreshTokenResponse {
  refresh_token: string;
}

export interface IResponseError {
  status: number;
  data: {
    error: string;
    error_description: string;
    message: string;
    statusCode: number;
  };
}
