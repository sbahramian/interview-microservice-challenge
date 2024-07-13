import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { GetUserJwtPayloadByIdQuery } from './get-user-jwt-payload-by-id.query';
import { UserProfileMap } from '../../../map';
import { GetUserJwtPayloadInterface } from '../../../interfaces';
import { User } from '@prisma/client';

@QueryHandler(GetUserJwtPayloadByIdQuery)
export class GetUserJwtPayloadByIdHandler implements IQueryHandler<GetUserJwtPayloadByIdQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: GetUserJwtPayloadByIdQuery): Promise<GetUserJwtPayloadInterface> {
    const user = await this.userFindById(query.user_id);
    return (await UserProfileMap.getUserJwtPayload(user)) as GetUserJwtPayloadInterface;
  }

  private async userFindById(user_id: number): Promise<User> {
    const _filter = {
      id: user_id,
    };

    return await this.userPrismaRepository.FindOne(_filter);
  }
}
