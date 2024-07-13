import { User } from '@prisma/client';
import { UserProfileInterface, GetUserJwtPayloadInterface } from '../interfaces';

export class UserProfileMap {
  static async item(item: User): Promise<UserProfileInterface> {
    return {
      user_id: item?.id || null,
      avatar: item?.avatar || null,
      first_name: item?.firstName || null,
      last_name: item?.lastName || null,
      email: item?.email || null,
      username: item.username,
    };
  }

  static async getUserJwtPayload(item: User): Promise<GetUserJwtPayloadInterface> {
    return {
      user_id: item?.id || null,
      role: item.role,
    };
  }
}
