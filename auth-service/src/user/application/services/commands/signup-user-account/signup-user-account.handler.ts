import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { localiczation } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum/localization.enum';
import { HttpStatus } from '@nestjs/common';
import { SignupUserAccountCommand } from './signup-user-account.command';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import {
  SignupUserAccountInterface,
  SignupUserAccountResponseInterface,
  UpdateUserProfilePayloadResponseInterface,
} from '../../../interfaces';
import { SignupUserAccountMap } from '../../../../../user/application/map';

@CommandHandler(SignupUserAccountCommand)
export class SignupUserAccountHandler implements ICommandHandler<SignupUserAccountCommand> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(command: SignupUserAccountCommand): Promise<SignupUserAccountResponseInterface> {
    const is_updated = await this.signupUserAccount(command.user_id, command.signup_data, command.lang);

    return is_updated;
  }

  private async signupUserAccount(
    user_id: number,
    update_user_profile: SignupUserAccountInterface,
    lang: string,
  ): Promise<UpdateUserProfilePayloadResponseInterface> {
    try {
      const exist = await this.checkUserExistById(user_id);

      if (!exist) {
        throw {
          ...localiczation.message(LocalizationMessage.USER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
        };
      }

      const username = await this.checkUsernameExist(update_user_profile.username);
      if (username) {
        throw {
          ...localiczation.message(LocalizationMessage.CHECK_USERNAME_NOT_VALID, { lang }, true, HttpStatus.CONFLICT),
        };
      }

      const need_prove = false;

      const user = await this.userPrismaRepository.UpdateById(user_id, {
        firstName: update_user_profile.first_name,
        lastName: update_user_profile.last_name,
        username: update_user_profile.username,
      });

      return SignupUserAccountMap.information(user, true, need_prove);
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

  private async checkUserExistById(id: number): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ id });
  }

  private async checkUsernameExist(username: string): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ username });
  }
}
