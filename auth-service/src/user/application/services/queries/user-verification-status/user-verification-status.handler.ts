import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { UserVerificationStatusInterface } from '../../../interfaces';
import { UserVerificationStatusQuery } from './user-verification-status.query';
import { localiczation } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum';
import { HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';

@QueryHandler(UserVerificationStatusQuery)
export class UserVerificationStatusHandler implements IQueryHandler<UserVerificationStatusQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: UserVerificationStatusQuery): Promise<UserVerificationStatusInterface> {
    const lang = query.lang;
    const phone = query.lang;
    const exist = await this.userEmailExist(phone);

    if (!exist) {
      throw {
        ...localiczation.message(LocalizationMessage.USER_PHONE_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    const verification_status = await this.checkUserVerification(phone);

    return {
      is_verification: verification_status,
    };
  }

  private async userEmailExist(email: string): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({
      email,
    });
  }

  private async checkUserVerification(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);

    if (user.email === user.username) {
      return true;
    }

    return false;
  }

  private async findUserByEmail(email: string): Promise<User> {
    return await this.userPrismaRepository.FindOne({
      email,
    });
  }
}
