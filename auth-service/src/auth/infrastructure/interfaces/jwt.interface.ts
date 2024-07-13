import { TokenTypeEnum } from 'src/common';

export interface JwtTokenInterface {
  access_token: string;
  refresh_token: string;
}

export interface JwtUserPayloadInterface {
  user_id: number;
  role: string;
}

export interface JwtPayloadInterface {
  user: JwtUserPayloadInterface;
}

export interface ValidateJwtPayloadInterface {
  payload?: JwtPayloadInterface;
  is_valid: boolean;
  type?: TokenTypeEnum;
}

export interface RefreshTokenInterface {
  refresh_token: string;
}

export interface CheckRefreshTokenResponseInterface {
  is_valid: boolean;
  user_id?: number;
}
