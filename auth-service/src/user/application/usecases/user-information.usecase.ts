import { HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMeQuery, GetUserProfileByIdQuery } from '../services/queries';
import { GetMeResponse, GetUserProfileResponse } from '../interfaces';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import { LogoutRequestInterface, LogoutResponseInterface } from '../../infrastructure/interfaces';
import { localiczation } from 'src/common';

@Injectable()
export class UserInformationUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  public async GetMe(user_id: number, lang: string): Promise<GetMeResponse> {
    try {
      const user = await this.queryBus.execute(new GetMeQuery(user_id, lang));

      return {
        data: {
          user,
        },
        meta: {
          ...localiczation.message(LocalizationMessage.GET_USER_PROFILE_SUCCESSFULLY, { lang }),
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

  public async GetUserProfile(user_id: number, lang: string): Promise<GetUserProfileResponse> {
    try {
      const user = await this.queryBus.execute(new GetUserProfileByIdQuery(user_id, lang));

      return {
        data: {
          user,
        },
        meta: {
          ...localiczation.message(LocalizationMessage.GET_USER_PROFILE_SUCCESSFULLY, { lang }),
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

  public async Logout(user_id: number, data: LogoutRequestInterface, lang: string): Promise<LogoutResponseInterface> {
    try {
      return {
        data: null,
        meta: {
          ...localiczation.message(LocalizationMessage.USER_LOGOUT_SUCCESSFULLY, { lang }),
        },
      };
    } catch (error) {
      if (error?.response?.meta) throw error;
      throw {
        ...localiczation.message(
          LocalizationMessage.INTERNAL_SERVER_ERROR,
          { lang },
          true,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        ),
      };
    }
  }
}
