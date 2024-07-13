import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { DEFAULT_OTP_CODE_CONSTANT } from '../../../infrastructure/constant';
import { TokenTypeEnum } from 'src/common';

export class OtpKeyManagerUtility {
  private readonly defaultEmailNumber: string[];

  constructor(
    @InjectPinoLogger(OtpKeyManagerUtility.name) private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {
    this.defaultEmailNumber = config.get<string[]>('DEFAULT_EMAIL_NUMBER', []);
  }

  public GeOtpDurationKey(email: string): string {
    return `auth:otp_duration:${email}`;
  }

  public GeOtpCodeKey(email: string): string {
    return `auth:otp_code:${email}`;
  }

  public GenerateOtpCode(email: string, sms_enabled: boolean): string {
    if (this.defaultEmailNumber.includes(email)) return DEFAULT_OTP_CODE_CONSTANT;
    if (sms_enabled === true) return (Math.floor(Math.random() * 90000) + 10000).toString();

    return DEFAULT_OTP_CODE_CONSTANT;
  }

  public GeJwtTokenKey(token: string, type: TokenTypeEnum): string {
    return `auth:${type.toLowerCase()}:${token}`;
  }
}
