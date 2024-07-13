import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteJwtTokenCommand } from './delete-jwt-token.command';
import { AuthRedisRepository } from '../../../../domain/services/repositories';
import { OtpKeyManagerUtility } from '../../utilities';

@CommandHandler(DeleteJwtTokenCommand)
export class DeleteJwtTokenHandler implements ICommandHandler<DeleteJwtTokenCommand> {
  constructor(
    private readonly authRedisRepository: AuthRedisRepository,
    private readonly otpKeyManagerUtility: OtpKeyManagerUtility,
  ) {}

  async execute(command: DeleteJwtTokenCommand): Promise<void> {
    const key = this.otpKeyManagerUtility.GeJwtTokenKey(command.token, command.type);
    await this.authRedisRepository.Destroy(key);
  }
}
