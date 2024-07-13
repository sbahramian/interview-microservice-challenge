import { MetaInterface } from 'src/common';

export interface CheckSignInTokenResponseInterface {
  is_exist: boolean;
  email?: string;
}

export interface UserAuthTokenInterface {
  user_id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface AuthTokenInterface {
  access_token: string;
  refresh_token: string;
  user: UserAuthTokenInterface | null;
}

export interface CheckSignInResponseInterface {
  data: AuthTokenInterface;
  meta: MetaInterface;
}
