import { SignupUserAccountInterface } from '../../../interfaces';

export class SignupUserAccountCommand {
  constructor(
    public readonly user_id: number,
    public readonly signup_data: SignupUserAccountInterface,
    public readonly lang: string,
  ) {}
}
