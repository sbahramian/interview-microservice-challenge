import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { UserProfileInterface } from '../../../../application/interfaces';
import { GetMeQuery } from './get-me.query';
import { localiczation } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum/localization.enum';
import { HttpStatus } from '@nestjs/common';
import { GetUserProfileMap } from '../../../../application/map';
import { User } from '@prisma/client';

@QueryHandler(GetMeQuery)
export class GetMeHandler implements IQueryHandler<GetMeQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: GetMeQuery): Promise<UserProfileInterface> {
    const lang = query.lang;
    const user_id = query.user_id;

    const exist = await this.userIdExist(user_id);

    if (!exist) {
      throw {
        ...localiczation.message(LocalizationMessage.USER_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    const user = await this.userFindById(user_id);

    const data = (await GetUserProfileMap.item(user)) as UserProfileInterface;

    return data;
  }

  private async userIdExist(id: number): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ id });
  }

  private async userFindById(user_id: number): Promise<User> {
    return await this.userPrismaRepository.FindUserById(user_id);
  }
}
