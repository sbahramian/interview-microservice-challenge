import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginUserByEmailInterface } from '../../infrastructure/interfaces';
import { CheckSignInByEmailPasswordQuery } from '../services/queries';
import { CheckSignInProcessByEmailPasswordInterface } from '../../infrastructure/interfaces';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @InjectPinoLogger(LoginUserUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async Login(data: LoginUserByEmailInterface): Promise<CheckSignInProcessByEmailPasswordInterface> {
    return await this.queryBus.execute(new CheckSignInByEmailPasswordQuery(data.email, data.password));
  }
}
