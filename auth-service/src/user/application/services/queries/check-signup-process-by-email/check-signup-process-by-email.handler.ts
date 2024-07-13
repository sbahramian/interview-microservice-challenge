import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { CheckSignUpProcessByEmailQuery } from './check-signup-process-by-email.query';
import { CheckUserMap } from '../../../map';
import { CheckSignUpProcessByEmailInterface } from '../../../../infrastructure/interfaces';
import { User } from '@prisma/client';

@QueryHandler(CheckSignUpProcessByEmailQuery)
export class CheckSignUpProcessByEmailHandler implements IQueryHandler<CheckSignUpProcessByEmailQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: CheckSignUpProcessByEmailQuery): Promise<CheckSignUpProcessByEmailInterface> {
    const user = await this.userFindByEmail(query.email);
    if (!user) return (await CheckUserMap.signUpProcessByEmail(false)) as CheckSignUpProcessByEmailInterface;

    return (await CheckUserMap.signUpProcessByEmail(true, user)) as CheckSignUpProcessByEmailInterface;
  }

  private async userFindByEmail(email: string): Promise<User> {
    const _filter = {
      email,
    };

    return await this.userPrismaRepository.FindOne(_filter);
  }
}
