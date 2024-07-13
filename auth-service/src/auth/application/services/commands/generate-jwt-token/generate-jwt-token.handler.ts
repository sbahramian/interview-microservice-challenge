import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateJwtTokenCommand } from './generate-jwt-token.command';
import { AesUtility } from '../../utilities';
import { JwtTokenInterface } from '../../../../infrastructure/interfaces';
import { JwtMap } from '../../../map';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_EXPIRES_ACCESS_TOKEN_CONSTANT,
  JWT_EXPIRES_REFRESH_TOKEN_CONSTANT,
} from '../../../../infrastructure/constant';
import { AuthRedisFactory } from '../../../../domain/services/factories';
import { OtpKeyManagerUtility } from '../../utilities';
import { CommonConvertor, TokenTypeEnum } from 'src/common';

@CommandHandler(GenerateJwtTokenCommand)
export class GenerateJwtTokenHandler implements ICommandHandler<GenerateJwtTokenCommand> {
  constructor(
    private readonly aesUtility: AesUtility,
    private readonly jwtService: JwtService,
    private authRedisFactory: AuthRedisFactory,
    private readonly otpKeyManagerUtility: OtpKeyManagerUtility,
  ) {}

  async execute(command: GenerateJwtTokenCommand): Promise<JwtTokenInterface> {
    const [access, refresh] = await Promise.all([
      this.aesUtility.Encrypt(
        await this.jwtService.signAsync(command.payload, {
          subject: TokenTypeEnum.ACCESS_TOKEN,
          expiresIn: JWT_EXPIRES_ACCESS_TOKEN_CONSTANT,
        }),
      ),
      this.aesUtility.Encrypt(
        await this.jwtService.signAsync(command.payload, {
          subject: TokenTypeEnum.REFRESH_TOKEN,
          expiresIn: JWT_EXPIRES_REFRESH_TOKEN_CONSTANT,
        }),
      ),
    ]);

    const ttl = CommonConvertor.DurationToRedisTTL(JWT_EXPIRES_REFRESH_TOKEN_CONSTANT) || 604800; // 7days
    const refresh_token_key = this.otpKeyManagerUtility.GeJwtTokenKey(refresh, TokenTypeEnum.REFRESH_TOKEN);
    await this.authRedisFactory.Upsert(refresh_token_key, command.payload.user.user_id, ttl);

    return JwtMap.generateToken(access, refresh) as JwtTokenInterface;
  }
}
