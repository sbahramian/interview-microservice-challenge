import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { CheckSignUpProcessByUserIdQuery } from './check-signup-process-by-user-id.query';
import { CheckUserMap } from '../../../map';
import { CheckSignUpProcessByEmailInterface } from '../../../../infrastructure/interfaces';
import { User } from '@prisma/client';

@QueryHandler(CheckSignUpProcessByUserIdQuery)
export class CheckSignUpProcessByUserIdHandler implements IQueryHandler<CheckSignUpProcessByUserIdQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: CheckSignUpProcessByUserIdQuery): Promise<CheckSignUpProcessByEmailInterface> {
    const user = await this.userFindById(query.user_id);
    if (!user) return (await CheckUserMap.signUpProcessByEmail(false)) as CheckSignUpProcessByEmailInterface;

    return (await CheckUserMap.signUpProcessByEmail(true, user)) as CheckSignUpProcessByEmailInterface;
  }

  private async userFindById(user_id: number): Promise<User> {
    const _filter = {
      id: user_id,
    };

    return await this.userPrismaRepository.FindOne(_filter);
  }
}
