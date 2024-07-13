import {
  CheckOtpCodeResponseInterface,
  GetOtpTokenResponseInterface,
  CheckSignatureResponseInterface,
  GetOtpTtlTokenResponseInterface,
} from '../interfaces';

export class SignUpMap {
  static checkOtpCode(has_key: boolean, ttl?: number): CheckOtpCodeResponseInterface {
    return {
      has_key,
      ttl: ttl || -1,
    };
  }

  static getOtpTtlToken(ttl: number): GetOtpTtlTokenResponseInterface {
    return {
      ttl,
    };
  }

  static getOtpToken(ttl: number, code: string): GetOtpTokenResponseInterface {
    return {
      ttl,
      code,
    };
  }

  static checkSignature(has_key: boolean): CheckSignatureResponseInterface {
    return {
      has_key,
    };
  }
}
