import { MetaInterface } from 'src/common';

export interface CheckSignatureResponseInterface {
  has_key: boolean;
}

export interface CheckOtpCodeResponseInterface {
  has_key: boolean;
  ttl?: number;
}

export interface GetOtpTokenResponseInterface {
  ttl: number;
  code?: string;
}

export interface GetOtpTtlTokenResponseInterface {
  ttl: number;
}

export interface SignUpResponseInterface {
  data?: GetOtpTokenResponseInterface;
  meta: MetaInterface;
}
