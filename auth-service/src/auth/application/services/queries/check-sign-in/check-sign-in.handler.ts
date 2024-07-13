import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { CheckSignInQuery } from './check-sign-in.query';
import { CheckSignInResponseInterface } from '../../../interfaces';

@QueryHandler(CheckSignInQuery)
export class CheckSignInHandler implements IQueryHandler<CheckSignInQuery> {
  constructor() {}

  async execute(query: CheckSignInQuery): Promise<CheckSignInResponseInterface> {
    console.log(query);

    return {
      data: {
        access_token: '',
        refresh_token: '',
        user: null,
      },
      meta: null,
    };
  }
}
