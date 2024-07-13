export class CheckSignInQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
