import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import {
  VerifyCodeRequestInterface,
  SignUpRequestInterface,
  SignInRequestInterface,
} from '../../infrastructure/interfaces';
import { DeleteOtpCodeCommand, GenerateJwtTokenCommand, GenerateOtpCommand } from '../services/commands';
import { CheckOtpCodeQuery, CheckOtpTokenQuery } from '../services/queries';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import {
  CheckOtpCodeResponseInterface,
  CheckOtpTokenResponseInterface,
  GetOtpTtlTokenResponseInterface,
  SignUpResponseInterface,
} from '../interfaces';
import { JwtPayloadInterface } from '../../infrastructure/interfaces';
import { SignUpMap } from '../map';
import { RegisterUserUseCase, CheckUserUseCase, LoginUserUseCase } from '../../../user/application/usecases';
import { CheckSignUpProcessByEmailUserPayloadInterface } from '../../../user/infrastructure/interfaces';
import { localiczation } from 'src/common';
import { VerifyCodeResponseInterface } from '../interfaces/verify-code.interface';

@Injectable()
export class AuthByEmailUseCase {
  constructor(
    @InjectPinoLogger(AuthByEmailUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(forwardRef(() => RegisterUserUseCase))
    private registerUserUseCase: RegisterUserUseCase,
    @Inject(forwardRef(() => CheckUserUseCase))
    private checkUserUseCase: CheckUserUseCase,
    @Inject(forwardRef(() => LoginUserUseCase))
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  public async SignUp(data: SignUpRequestInterface, lang: string): Promise<SignUpResponseInterface> {
    try {
      const otp_query: CheckOtpCodeResponseInterface = await this.queryBus.execute(new CheckOtpCodeQuery(data.email));
      if (otp_query.has_key) {
        const payload = SignUpMap.getOtpTtlToken(otp_query.ttl) as GetOtpTtlTokenResponseInterface;

        throw new HttpException(
          {
            data: payload,
            meta: {
              ...localiczation.message(
                LocalizationMessage.TOO_MANY_REQUEST_ERROR,
                { lang },
                true,
                HttpStatus.FORBIDDEN,
              ),
              extra_data: payload,
            },
          },
          HttpStatus.TOO_MANY_REQUESTS,
        );
      }
      const token_command = await this.commandBus.execute(new GenerateOtpCommand(data.email, false));

      return {
        data: {
          ttl: token_command.ttl,
        },
        meta: {
          ...localiczation.message(LocalizationMessage.VERIFY_EMAIL, { lang }, false, HttpStatus.OK),
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      throw {
        ...localiczation.message(
          [LocalizationMessage.INTERNAL_SERVER_ERROR],
          { lang },
          error,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      };
    }
  }

  public async VerifyCode(data: VerifyCodeRequestInterface, lang: string): Promise<VerifyCodeResponseInterface> {
    try {
      const otp_query: CheckOtpTokenResponseInterface = await this.queryBus.execute(
        new CheckOtpTokenQuery(data.confirmation_code, data.email),
      );

      if (!otp_query.is_exist) {
        throw new HttpException(
          {
            meta: {
              ...localiczation.message(LocalizationMessage.VERIFY_CODE_NOT_FOUND, { lang }, true, HttpStatus.FORBIDDEN),
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const signup = await this.checkUserUseCase.IsSignupProcessCompletedByEmail({
        email: data.email,
        lang,
      });
      await this.commandBus.execute(new DeleteOtpCodeCommand(data.email));

      if (!signup.is_exist) {
        const user = await this.registerUserUseCase.RegisterUserByEmail({
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.password,
          lang,
        });

        const result = await this.generateToken(
          user.user,
          lang,
          HttpStatus.CREATED,
          false,
          LocalizationMessage.VERIFY_CODE_CREATED,
        );
        return result;
      } else {
        throw new HttpException(
          {
            meta: {
              ...localiczation.message(LocalizationMessage.VERIFY_CODE_COMPLETED, { lang }, true, HttpStatus.CONFLICT),
            },
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      if (error?.response?.meta) throw error;
      throw {
        ...localiczation.message(
          [LocalizationMessage.INTERNAL_SERVER_ERROR],
          { lang },
          error,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      };
    }
  }

  public async SignIn(data: SignInRequestInterface, lang: string): Promise<VerifyCodeResponseInterface> {
    try {
      const validate_user = await this.loginUserUseCase.Login(data);
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
