export class RegisterAdminByEmailCommand {
  constructor(
    public readonly email: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly password: string,
    public readonly lang: string,
  ) {}
}
