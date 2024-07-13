import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginUserByEmailInterface } from '../../infrastructure/interfaces';
import { CheckSignInAdminByEmailPasswordQuery } from '../services/queries';
import { CheckSignInProcessByEmailPasswordInterface } from '../../infrastructure/interfaces';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoginAdminUseCase {
  constructor(
    @InjectPinoLogger(LoginAdminUseCase.name) private readonly logger: PinoLogger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public async Login(data: LoginUserByEmailInterface): Promise<CheckSignInProcessByEmailPasswordInterface> {
    return await this.queryBus.execute(new CheckSignInAdminByEmailPasswordQuery(data.email, data.password));
  }
}
