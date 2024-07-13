import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CheckRefreshTokenQuery } from './check-refresh-token.query';
import { CheckRefreshTokenResponseInterface } from '../../../../infrastructure/interfaces';
import { JwtService } from '@nestjs/jwt';
import { AesUtility } from '../../utilities';
import { JWT_SECRET_CONSTANT } from '../../../../infrastructure/constant';
import { JwtMap } from '../../../map';
import { OtpKeyManagerUtility } from '../../utilities';
import { AuthRedisRepository } from '../../../../domain/services/repositories';
import { TokenTypeEnum } from 'src/common';

@QueryHandler(CheckRefreshTokenQuery)
export class CheckRefreshTokenHandler implements IQueryHandler<CheckRefreshTokenQuery> {
  constructor(
    private readonly aesUtility: AesUtility,
    private readonly jwtService: JwtService,
    private readonly otpKeyManagerUtility: OtpKeyManagerUtility,
    private readonly authRedisRepository: AuthRedisRepository,
  ) {}

  async execute(query: CheckRefreshTokenQuery): Promise<CheckRefreshTokenResponseInterface> {
    try {
      const token = await this.aesUtility.Decrypt(query.refresh_token);
      const jwtPayload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET_CONSTANT,
      });

      if (jwtPayload.sub !== TokenTypeEnum.REFRESH_TOKEN)
        return JwtMap.validateRefreshToken(false) as CheckRefreshTokenResponseInterface;

      const refresh_token_key = this.otpKeyManagerUtility.GeJwtTokenKey(
        query.refresh_token,
        TokenTypeEnum.REFRESH_TOKEN,
      );
      const key = await this.authRedisRepository.IsExist(refresh_token_key);
      if (!key) return JwtMap.validateRefreshToken(false) as CheckRefreshTokenResponseInterface;

      return JwtMap.validateRefreshToken(true, jwtPayload.user.id) as CheckRefreshTokenResponseInterface;
    } catch (error) {
      return JwtMap.validateRefreshToken(false) as CheckRefreshTokenResponseInterface;
    }
  }
}
