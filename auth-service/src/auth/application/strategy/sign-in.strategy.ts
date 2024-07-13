import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { LocalizationMessage } from 'src/auth/infrastructure/localization/enum';
import { localiczation } from 'src/common';
import { LoginUserUseCase } from 'src/user/application/usecases';
import { CheckSignUpProcessByEmailUserPayloadInterface } from 'src/user/infrastructure/interfaces';

@Injectable()
export class SignInStrategy extends PassportStrategy(Strategy, 'SignInStrategy') {
  constructor(
    @Inject(forwardRef(() => LoginUserUseCase))
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<CheckSignUpProcessByEmailUserPayloadInterface> {
    try {
      const validate_user = await this.loginUserUseCase.Login({ email, password });
      console.log(validate_user);
      if (!validate_user.is_exist) {
        throw new HttpException(
          {
            meta: {
              ...localiczation.message(LocalizationMessage.EMAIL_NOT_REGISTERED, null, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (!validate_user.is_login) {
        throw new HttpException(
          {
            meta: {
              ...localiczation.message(LocalizationMessage.LOGIN_USERNAME_OR_PASSWORD_IS_INVALID, null, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      return validate_user.user;
    } catch (error) {
      throw new HttpException(
        {
          meta: {
            ...localiczation.message(LocalizationMessage.LOGIN_USERNAME_OR_PASSWORD_IS_INVALID, null, true),
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
