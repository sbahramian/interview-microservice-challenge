export class UserVerificationStatusQuery {
  constructor(
    public readonly email: string,
    public readonly lang: string,
  ) {}
}
