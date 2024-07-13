import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CheckOtpTokenQuery } from './check-otp-token.query';
import { AuthRedisRepository } from '../../../../domain/services/repositories';
import { OtpKeyManagerUtility } from '../../utilities';
import { CheckOtpTokenResponseInterface } from '../../../interfaces';
import { VerifyCodeMap } from '../../../map';

@QueryHandler(CheckOtpTokenQuery)
export class CheckOtpTokenHandler implements IQueryHandler<CheckOtpTokenQuery> {
  constructor(
    private readonly authRedisRepository: AuthRedisRepository,
    private readonly otpKeyManagerUtility: OtpKeyManagerUtility,
  ) {}

  async execute(query: CheckOtpTokenQuery): Promise<CheckOtpTokenResponseInterface> {
    const duration_key = this.otpKeyManagerUtility.GeOtpCodeKey(query.email);
    const code = await this.authRedisRepository.Find(duration_key);

    if (!code || code != query.confirmation_code)
      return VerifyCodeMap.checkOtpToken(false) as CheckOtpTokenResponseInterface;

    return VerifyCodeMap.checkOtpToken(true, query.email) as CheckOtpTokenResponseInterface;
  }
}
