import { MetaInterface } from 'src/common';

export interface UserRefreshTokenPayloadInterface {
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
  user_id: number;
}

export interface RefreshTokenPayloadInterface {
  access_token: string;
  refresh_token: string;
  user: UserRefreshTokenPayloadInterface;
}

export interface RefreshTokenResponseInterface {
  data: RefreshTokenPayloadInterface;
  meta: MetaInterface;
}
