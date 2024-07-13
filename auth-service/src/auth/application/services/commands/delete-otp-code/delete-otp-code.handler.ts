import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteOtpCodeCommand } from './delete-otp-code.command';
import { AuthRedisRepository } from '../../../../domain/services/repositories';
import { OtpKeyManagerUtility } from '../../utilities';

@CommandHandler(DeleteOtpCodeCommand)
export class DeleteOtpCodeHandler implements ICommandHandler<DeleteOtpCodeCommand> {
  constructor(
    private readonly authRedisRepository: AuthRedisRepository,
    private readonly otpKeyManagerUtility: OtpKeyManagerUtility,
  ) {}

  async execute(command: DeleteOtpCodeCommand): Promise<void> {
    const duration_key = this.otpKeyManagerUtility.GeOtpDurationKey(command.email);
    const otp_key = this.otpKeyManagerUtility.GeOtpCodeKey(command.email);

    await this.authRedisRepository.Destroy(duration_key);
    await this.authRedisRepository.Destroy(otp_key);
  }
}
