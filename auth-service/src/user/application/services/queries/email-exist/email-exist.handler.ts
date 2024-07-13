import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { EmailExistInterface } from '../../../interfaces';
import { EmailExistQuery } from './email-exist.query';

@QueryHandler(EmailExistQuery)
export class EmailExistHandler implements IQueryHandler<EmailExistQuery> {
  constructor(private readonly userPrismaRepository: UserPrismaRepository) {}

  async execute(query: EmailExistQuery): Promise<EmailExistInterface> {
    const exist = await this.emailExist(query.email);

    return {
      is_exist: exist,
    };
  }

  private async emailExist(email: string): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ email });
  }
}
