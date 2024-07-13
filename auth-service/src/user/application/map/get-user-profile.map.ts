import { User } from '@prisma/client';
import { GetMeResponseInterface } from '../interfaces';

export class GetUserProfileMap {
  static async item(item: User): Promise<GetMeResponseInterface> {
    return {
      user_id: item?.id || null,
      avatar: item?.avatar || null,
      first_name: item?.firstName || null,
      last_name: item?.lastName || null,
      email: item.email,
      username: item.username,
    };
  }
}
