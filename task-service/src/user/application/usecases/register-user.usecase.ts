import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterNewUserByEmailInterface } from '../../infrastructure/interfaces';
import { RegisterUserByEmailCommand } from '../services/commands';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @InjectPinoLogger(RegisterUserUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async RegisterUserByEmail(data: RegisterNewUserByEmailInterface): Promise<void> {
    return await this.commandBus.execute(
      new RegisterUserByEmailCommand(data.user_id, data.email, data.first_name, data.last_name, data.role),
    );
  }
}
