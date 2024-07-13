import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterNewUserByEmailInterface } from '../../infrastructure/interfaces';
import { RegisterUserByEmailCommand, SignupUserAccountCommand, UpdateUserProfileCommand } from '../services/commands';
import { CheckSignUpProcessByEmailInterface } from '../../infrastructure/interfaces';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import {
  SignupUserAccountInterface,
  UpdateUserProfileInterface,
  UpdateUserProfilePayloadResponseInterface,
  UpdateUserProfileResponse,
} from '../interfaces';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { localiczation } from 'src/common';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @InjectPinoLogger(RegisterUserUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async RegisterUserByEmail(data: RegisterNewUserByEmailInterface): Promise<CheckSignUpProcessByEmailInterface> {
    return await this.commandBus.execute(
      new RegisterUserByEmailCommand(data.email, data.first_name, data.last_name, data.password, data.lang),
    );
  }

  public async UpdateUserProfile(
    user_id: number,
    user_profile: UpdateUserProfileInterface,
    lang: string,
  ): Promise<UpdateUserProfileResponse> {
    try {
      const is_updated = await this.commandBus.execute(new UpdateUserProfileCommand(user_id, user_profile, lang));

      return {
        data: is_updated,
        meta: {
          ...localiczation.message(LocalizationMessage.UPDATING_USER_PROFILE_SUCCESSFULLY, { lang }),
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      localiczation.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  public async SignupUserAccount(
    user_id: number,
    signup_data: SignupUserAccountInterface,
    lang: string,
  ): Promise<UpdateUserProfileResponse> {
    try {
      const is_updated: UpdateUserProfilePayloadResponseInterface = await this.commandBus.execute(
        new SignupUserAccountCommand(user_id, signup_data, lang),
      );

      return {
        data: is_updated,
        meta: {
          ...localiczation.message(LocalizationMessage.SIGNUP_USER_ACCOUNT_SUCCESSFULLY, { lang }),
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      localiczation.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
