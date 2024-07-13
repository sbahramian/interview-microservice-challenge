import { User } from '@prisma/client';
import { UpdateUserProfilePayloadResponseInterface } from '../interfaces';

export class SignupUserAccountMap {
  static async information(
    user: User,
    is_updated: boolean,
    need_authorization: boolean,
  ): Promise<UpdateUserProfilePayloadResponseInterface> {
    return {
      user: {
        user_id: user.id || null,
        avatar: user.avatar || null,
        first_name: user.firstName || null,
        last_name: user.lastName || null,
        username: user.username,
      },
      is_updated,
      need_authorization,
    };
  }
}
