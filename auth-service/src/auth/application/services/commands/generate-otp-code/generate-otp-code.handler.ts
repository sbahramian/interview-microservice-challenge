import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateOtpCommand } from './generate-otp-code.command';
import { AuthRedisFactory } from '../../../../domain/services/factories';
import { OtpKeyManagerUtility } from '../../utilities';
import { ConfigService } from '@nestjs/config';
import { GetOtpTokenResponseInterface } from '../../../interfaces';
import { SignUpMap } from '../../../map';

@CommandHandler(GenerateOtpCommand)
export class GenerateOtpHandler implements ICommandHandler<GenerateOtpCommand> {
  private readonly otpDurationTTL: number;
  private readonly otpTokenTTL: number;

  constructor(
    private readonly config: ConfigService,
    private authRedisFactory: AuthRedisFactory,
    private readonly otpKeyManagerUtility: OtpKeyManagerUtility,
  ) {
    this.otpDurationTTL = +config.get<number>('OTP_DURATION_TTL', 120);
    this.otpTokenTTL = +config.get<number>('OTP_TOKEN_TTL', 900);
  }

  async execute(command: GenerateOtpCommand): Promise<GetOtpTokenResponseInterface> {
    const duration_key = this.otpKeyManagerUtility.GeOtpDurationKey(command.email);
    const otp_key = this.otpKeyManagerUtility.GeOtpCodeKey(command.email);

    const code = this.otpKeyManagerUtility.GenerateOtpCode(command.email, command.otpEnabled);

    await Promise.all([
      this.authRedisFactory.Upsert(otp_key, code, this.otpTokenTTL),
      this.authRedisFactory.Upsert(duration_key, code, this.otpDurationTTL),
    ]);

    return SignUpMap.getOtpToken(this.otpDurationTTL, code) as GetOtpTokenResponseInterface;
  }
}
