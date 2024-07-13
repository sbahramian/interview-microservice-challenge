export class GenerateOtpCommand {
  constructor(
    public readonly email: string,
    public readonly otpEnabled: boolean,
  ) {}
}
