import { CheckOtpTokenResponseInterface } from '../interfaces';

export class VerifyCodeMap {
  static checkOtpToken(is_exist: boolean, email?: string): CheckOtpTokenResponseInterface {
    return {
      is_exist,
      email: email || null,
    };
  }
}
