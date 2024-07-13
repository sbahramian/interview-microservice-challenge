import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { SignInRequestInterface } from '../../infrastructure/interfaces';
import { GenerateJwtTokenCommand } from '../services/commands';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import { JwtPayloadInterface } from '../../infrastructure/interfaces';
import { RegisterUserUseCase, CheckUserUseCase, LoginAdminUseCase } from '../../../user/application/usecases';
import { CheckSignUpProcessByEmailUserPayloadInterface } from '../../../user/infrastructure/interfaces';
import { localiczation } from 'src/common';
import { VerifyCodeResponseInterface } from '../interfaces/verify-code.interface';

@Injectable()
export class AuthAdminByEmailUseCase {
  constructor(
    @InjectPinoLogger(AuthAdminByEmailUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(forwardRef(() => RegisterUserUseCase))
    private registerUserUseCase: RegisterUserUseCase,
    @Inject(forwardRef(() => CheckUserUseCase))
    private checkUserUseCase: CheckUserUseCase,
    @Inject(forwardRef(() => LoginAdminUseCase))
    private readonly loginAdminUseCase: LoginAdminUseCase,
  ) {}

  public async SignIn(data: SignInRequestInterface, lang: string): Promise<VerifyCodeResponseInterface> {
    try {
      const validate_user = await this.loginAdminUseCase.Login(data);
      if (!validate_user.is_exist) {
        throw new HttpException(
          {
            meta: {
              ...localiczation.message(
                LocalizationMessage.EMAIL_NOT_REGISTERED,
                { lang },
                true,
                HttpStatus.UNAUTHORIZED,
              ),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (!validate_user.is_login) {
        throw new HttpException(
          {
            meta: {
              ...localiczation.message(
                LocalizationMessage.LOGIN_USERNAME_OR_PASSWORD_IS_INVALID,
                { lang },
                true,
                HttpStatus.UNAUTHORIZED,
              ),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return await this.generateToken(
        validate_user.user,
        lang,
        HttpStatus.OK,
        false,
        LocalizationMessage.VERIFY_CODE_COMPLETED,
      );
    } catch (error) {
      console.log(error);
      if (error?.response?.meta) throw error;
      throw {
        ...localiczation.message(
          LocalizationMessage.INTERNAL_SERVER_ERROR,
          { lang },
          error,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      };
    }
  }

  private async generateToken(
    data: CheckSignUpProcessByEmailUserPayloadInterface,
    lang: string,
    http: HttpStatus,
    has_error: boolean,
    message: LocalizationMessage,
  ): Promise<VerifyCodeResponseInterface> {
    const payload: JwtPayloadInterface = {
      user: {
        user_id: data.user_id,
        role: data.role,
      },
    };
    console.log(http, has_error);
    const command = await this.commandBus.execute(new GenerateJwtTokenCommand(payload));

    return {
      data: {
        user: {
          user_id: data.user_id,
          avatar: data.avatar,
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
        },
        access_token: command.access_token,
        refresh_token: command.refresh_token,
      },
      meta: {
        ...localiczation.message(message, { lang }),
      },
    };
  }
}
