import { TokenTypeEnum } from '../../../common';
import {
  JwtPayloadInterface,
  JwtTokenInterface,
  CheckRefreshTokenResponseInterface,
  ValidateJwtPayloadInterface,
} from '../../infrastructure/interfaces';

export class JwtMap {
  static generateToken(access_token: string, refresh_token: string): JwtTokenInterface {
    return {
      access_token,
      refresh_token,
    };
  }

  static validateRefreshToken(is_valid: boolean, user_id?: number): CheckRefreshTokenResponseInterface {
    return {
      is_valid,
      user_id,
    };
  }

  static validateToken(
    is_valid: boolean,
    payload?: JwtPayloadInterface,
    type?: TokenTypeEnum,
  ): ValidateJwtPayloadInterface {
    return {
      is_valid,
      payload,
      type,
    };
  }
}
