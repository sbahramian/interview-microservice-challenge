import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserByEmailCommand } from './register-user-by-email.command';
import { UserPrismaFactory } from '../../../../domain/services/factories';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { RoleEnum } from 'src/common';

@CommandHandler(RegisterUserByEmailCommand)
export class RegisterUserByEmailHandler implements ICommandHandler<RegisterUserByEmailCommand> {
  constructor(
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly userPrismaFactory: UserPrismaFactory,
  ) {}

  async execute(command: RegisterUserByEmailCommand): Promise<void> {
    const email_exist = await this.emailExist(command.email);

    if (!email_exist) {
      await this.registerUserByEmail(
        command.user_id,
        command.email,
        command.first_name,
        command.last_name,
        command.role,
      );
    }
    console.log('Count user:', await this.userPrismaRepository.Count());
  }

  private async emailExist(email: string): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ email });
  }

  private async registerUserByEmail(
    user_id: number,
    email: string,
    first_name: string,
    last_name: string,
    role: RoleEnum,
  ): Promise<void> {
    await this.userPrismaFactory.Create({
      id: user_id,
      email: email,
      firstName: first_name,
      lastName: last_name,
      role: role,
    });
  }
}
