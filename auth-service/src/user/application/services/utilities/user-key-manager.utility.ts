import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export class UserKeyManagerUtility {
  constructor(@InjectPinoLogger(UserKeyManagerUtility.name) private readonly logger: PinoLogger) {}

  public GetUserRoleByUserIdKey(user_id: number): string {
    return `user:get_role_by_user_id:${user_id}`;
  }
}
