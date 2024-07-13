import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CheckOtpCodeQuery } from './check-otp-code.query';
import { AuthRedisRepository } from '../../../../domain/services/repositories';
import { OtpKeyManagerUtility } from '../../utilities';
import { CheckOtpCodeResponseInterface } from '../../../interfaces';
import { SignUpMap } from '../../../map';

@QueryHandler(CheckOtpCodeQuery)
export class CheckOtpCodeHandler implements IQueryHandler<CheckOtpCodeQuery> {
  constructor(
    private readonly authRedisRepository: AuthRedisRepository,
    private readonly otpKeyManagerUtility: OtpKeyManagerUtility,
  ) {}

  async execute(query: CheckOtpCodeQuery): Promise<CheckOtpCodeResponseInterface> {
    const key = this.otpKeyManagerUtility.GeOtpDurationKey(query.email);
    const otp = await this.authRedisRepository.Find(key);

    if (!otp) return SignUpMap.checkOtpCode(false) as CheckOtpCodeResponseInterface;

    const ttl = await this.authRedisRepository.GetTTL(key);
    if (ttl > 0) return SignUpMap.checkOtpCode(true, ttl) as CheckOtpCodeResponseInterface;

    return SignUpMap.checkOtpCode(false, ttl) as CheckOtpCodeResponseInterface;
  }
}
