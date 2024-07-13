import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterAdminByEmailCommand } from './register-admin-by-email.command';
import { CheckSignUpProcessByEmailInterface } from '../../../../infrastructure/interfaces';
import { UserPrismaFactory } from '../../../../domain/services/factories';
import { localiczation, hashPassword, TransportNameEnum, RoleEnum } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum/localization.enum';
import { HttpStatus, Inject } from '@nestjs/common';
import { UserPrismaRepository } from '../../../../domain/services/repositories';
import { CheckUserMap } from '../../../map';
import { ClientKafka } from '@nestjs/microservices';
import { USER_TOPIC_V1_CONSTANT } from 'src/common/constant/topics.constant';

@CommandHandler(RegisterAdminByEmailCommand)
export class RegisterAdminByEmailHandler implements ICommandHandler<RegisterAdminByEmailCommand> {
  constructor(
    @Inject(TransportNameEnum.TASK_SERVICE) private readonly client: ClientKafka,
    private readonly userPrismaRepository: UserPrismaRepository,
    private readonly userPrismaFactory: UserPrismaFactory,
  ) {}

  async execute(command: RegisterAdminByEmailCommand): Promise<CheckSignUpProcessByEmailInterface> {
    const lang = command.lang;
    const email_exist = await this.emailExist(command.email);

    if (email_exist) {
      throw {
        ...localiczation.message(LocalizationMessage.USER_EMAIL_ALREADY_EXIST, { lang }, true, HttpStatus.CONFLICT),
      };
    }

    const user = await this.RegisterAdminByEmail(
      command.email,
      command.first_name,
      command.last_name,
      command.password,
      command.lang,
    );

    this.client.emit(USER_TOPIC_V1_CONSTANT.CREATED, {
      user_id: user.user.user_id,
      role: user.user.role,
      email: user.user.email,
      first_name: user.user.first_name,
      last_name: user.user.last_name,
    });

    return user;
  }

  private async emailExist(email: string): Promise<boolean> {
    return await this.userPrismaRepository.IsExist({ email });
  }

  private async RegisterAdminByEmail(
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    lang: string,
  ): Promise<CheckSignUpProcessByEmailInterface> {
    try {
      const user = await this.userPrismaFactory.Create({
        avatar: '',
        username: email,
        email: email,
        firstName: first_name,
        lastName: last_name,
        role: RoleEnum.ADMIN,
        password: hashPassword.getHash(password),
      });

      return (await CheckUserMap.signUpProcessByEmail(true, user)) as CheckSignUpProcessByEmailInterface;
    } catch (error) {
      if (error?.response?.meta) throw error;
      localiczation.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
