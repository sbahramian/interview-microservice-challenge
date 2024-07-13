import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { CheckSignInAdminByEmailPasswordQuery } from './check-sign-in-admin-by-email-password.query';
import { CheckUserSignInMap } from '../../../map';
import { CheckSignInProcessByEmailPasswordInterface } from '../../../../infrastructure/interfaces';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { RoleEnum } from 'src/common';

@QueryHandler(CheckSignInAdminByEmailPasswordQuery)
export class CheckSignInAdminByEmailPasswordHandler implements IQueryHandler<CheckSignInAdminByEmailPasswordQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: CheckSignInAdminByEmailPasswordQuery): Promise<CheckSignInProcessByEmailPasswordInterface> {
    const user = await this.userFindByEmail(query.email);
    if (!user)
      return (await CheckUserSignInMap.signInProcessByEmail(
        false,
        false,
      )) as CheckSignInProcessByEmailPasswordInterface;

    if (!compareSync(query.password, user.password)) {
      return (await CheckUserSignInMap.signInProcessByEmail(true, false)) as CheckSignInProcessByEmailPasswordInterface;
    }
    return (await CheckUserSignInMap.signInProcessByEmail(
      true,
      true,
      user,
    )) as CheckSignInProcessByEmailPasswordInterface;
  }

  private async userFindByEmail(email: string): Promise<User> {
    const _filter = {
      email,
      role: RoleEnum.ADMIN,
    };

    return await this.userPrismaRepository.FindOne(_filter);
  }
}
