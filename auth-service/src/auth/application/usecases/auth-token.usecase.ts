import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { CheckRefreshTokenQuery } from '../services/queries';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import { CheckRefreshTokenResponseInterface, RefreshTokenInterface } from '../../infrastructure/interfaces';
import { DeleteJwtTokenCommand, GenerateJwtTokenCommand } from '../services/commands';
import { CheckUserUseCase } from '../../../user/application/usecases';
import { RefreshTokenResponseInterface } from '../interfaces';
import { TokenTypeEnum, localiczation } from 'src/common';

@Injectable()
export class AuthTokenUseCase {
  constructor(
    @InjectPinoLogger(AuthTokenUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(forwardRef(() => CheckUserUseCase))
    private checkUserUseCase: CheckUserUseCase,
  ) {}

  public async RefreshToken(data: RefreshTokenInterface, lang: string): Promise<RefreshTokenResponseInterface> {
    try {
      const token: CheckRefreshTokenResponseInterface = await this.queryBus.execute(
        new CheckRefreshTokenQuery(data.refresh_token),
      );

      if (!token.is_valid) {
        throw new HttpException(
          {
            meta: {
              ...localiczation.message(LocalizationMessage.REFRESH_TOKEN_UNAUTHORIZED, { lang }, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = await this.checkUserUseCase.GetUserJwtPayloadById({ user_id: token.user_id, lang });
      const command = await this.commandBus.execute(
        new GenerateJwtTokenCommand({
          user: user,
        }),
      );

      await this.commandBus.execute(new DeleteJwtTokenCommand(data.refresh_token, TokenTypeEnum.REFRESH_TOKEN));
      const signup = await this.checkUserUseCase.IsSignupProcessCompletedById({ user_id: user.user_id });
      return {
        data: {
          user: {
            user_id: user?.user_id || null,
            email: signup.user.email,
            avatar: signup.user.avatar,
            first_name: signup.user.first_name,
            last_name: signup.user.last_name,
          },
          access_token: command.access_token,
          refresh_token: command.refresh_token,
        },
        meta: {
          ...localiczation.message(LocalizationMessage.REFRESH_TOKEN_ACCEPTED, { lang }),
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      throw {
        ...localiczation.message(
          LocalizationMessage.REFRESH_TOKEN_UNAUTHORIZED,
          { lang },
          error,
          HttpStatus.UNAUTHORIZED,
        ),
      };
    }
  }
}
