export class CheckSignInAdminByEmailPasswordQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
