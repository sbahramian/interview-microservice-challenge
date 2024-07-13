export class CheckOtpTokenQuery {
  constructor(
    public readonly confirmation_code: string,
    public readonly email: string,
  ) {}
}
