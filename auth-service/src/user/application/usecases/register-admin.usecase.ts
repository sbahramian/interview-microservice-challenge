import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterNewUserByEmailInterface } from '../../infrastructure/interfaces';
import { RegisterAdminByEmailCommand } from '../services/commands';
import { CheckSignUpProcessByEmailInterface } from '../../infrastructure/interfaces';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class RegisterAdminUseCase {
  constructor(
    @InjectPinoLogger(RegisterAdminUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async RegisterUserByEmail(data: RegisterNewUserByEmailInterface): Promise<CheckSignUpProcessByEmailInterface> {
    return await this.commandBus.execute(
      new RegisterAdminByEmailCommand(data.email, data.first_name, data.last_name, data.password, data.lang),
    );
  }
}
