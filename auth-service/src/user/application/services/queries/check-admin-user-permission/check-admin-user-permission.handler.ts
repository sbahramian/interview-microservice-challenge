import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { CheckAdminUserPermissionQuery } from './check-admin-user-permission.query';

@QueryHandler(CheckAdminUserPermissionQuery)
export class CheckAdminUserPermissionHandler implements IQueryHandler<CheckAdminUserPermissionQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: CheckAdminUserPermissionQuery): Promise<boolean> {
    const user_id = query.user_id;

    const exist = await this.userIdExist(user_id);
    if (!exist) {
      return false;
    }

    return false;
  }

  private async userIdExist(id: number): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ id });
  }
}
