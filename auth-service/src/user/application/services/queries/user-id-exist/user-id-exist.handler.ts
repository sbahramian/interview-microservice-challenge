import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { UserIdExistInterface } from '../../../interfaces';
import { UserIdExistQuery } from './user-id-exist.query';

@QueryHandler(UserIdExistQuery)
export class UserIdExistHandler implements IQueryHandler<UserIdExistQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: UserIdExistQuery): Promise<UserIdExistInterface> {
    const exist = await this.userIdExist(query.user_id);

    return {
      is_exist: exist,
    };
  }

  private async userIdExist(id: number): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ id });
  }
}
