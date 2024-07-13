import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  RegisterUserByEmailInterface,
  CheckSignUpProcessByEmailInterface,
  GetUserJwtPayloadByIdRequestInterface,
  CheckSignUpProcessByIdRequestInterface,
} from '../../infrastructure/interfaces';
import { GetUserJwtPayloadInterface } from '../interfaces';
import {
  CheckSignUpProcessByEmailQuery,
  GetUserJwtPayloadByIdQuery,
  CheckSignUpProcessByUserIdQuery,
} from '../services/queries';

@Injectable()
export class CheckUserUseCase {
  constructor(private readonly queryBus: QueryBus) {}

  public async IsSignupProcessCompletedByEmail(
    data: RegisterUserByEmailInterface,
  ): Promise<CheckSignUpProcessByEmailInterface> {
    return await this.queryBus.execute(new CheckSignUpProcessByEmailQuery(data.email));
  }

  public async IsSignupProcessCompletedById(
    data: CheckSignUpProcessByIdRequestInterface,
  ): Promise<CheckSignUpProcessByEmailInterface> {
    return await this.queryBus.execute(new CheckSignUpProcessByUserIdQuery(data.user_id));
  }

  public async GetUserJwtPayloadById(data: GetUserJwtPayloadByIdRequestInterface): Promise<GetUserJwtPayloadInterface> {
    return await this.queryBus.execute(new GetUserJwtPayloadByIdQuery(data.user_id));
  }
}
