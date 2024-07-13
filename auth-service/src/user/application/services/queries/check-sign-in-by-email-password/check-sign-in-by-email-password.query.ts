export class CheckSignInByEmailPasswordQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
