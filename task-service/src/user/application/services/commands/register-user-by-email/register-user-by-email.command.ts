import { RoleEnum } from 'src/common';

export class RegisterUserByEmailCommand {
  constructor(
    public readonly user_id: number,
    public readonly email: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly role: RoleEnum,
  ) {}
}
