import { MetaInterface } from 'src/common';

export interface CheckOtpTokenResponseInterface {
  is_exist: boolean;
  email?: string;
}

export interface UserAuthTokenInterface {
  user_id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface AuthTokenInterface {
  access_token: string;
  refresh_token: string;
  user: UserAuthTokenInterface;
}

export interface VerifyCodeResponseInterface {
  data: AuthTokenInterface;
  meta: MetaInterface;
}
