import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { localiczation } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum/localization.enum';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserProfileCommand } from './update-user-profile.command';
import { UpdateUserProfileInterface } from '../../../../application/interfaces/update-user-profile.interface';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { UpdateUserProfileResponseInterface } from '../../../../application/interfaces/update-user-profile-response.interface';

@CommandHandler(UpdateUserProfileCommand)
export class UpdateUserProfileHandler implements ICommandHandler<UpdateUserProfileCommand> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(command: UpdateUserProfileCommand): Promise<UpdateUserProfileResponseInterface> {
    const is_updated = await this.updateUserProfile(command.user_id, command.dto, command.lang);

    return is_updated;
  }

  private async updateUserProfile(
    user_id: number,
    update_user_profile: UpdateUserProfileInterface,
    lang: string,
  ): Promise<{ is_updated: boolean }> {
    try {
      const exist = await this.checkUserExistById(user_id);

      if (!exist) {
        throw {
          ...localiczation.message(LocalizationMessage.USER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
        };
      }

      await this.userPrismaRepository.UpdateById(user_id, {
        firstName: update_user_profile?.first_name,
        lastName: update_user_profile?.last_name,
        avatar: update_user_profile?.avatar || !update_user_profile?.avatar ? update_user_profile?.avatar : '',
      });

      return {
        is_updated: true,
      };
    } catch (error) {
      console.log(error);
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
}
