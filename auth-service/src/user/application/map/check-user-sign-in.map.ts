import { User } from '@prisma/client';
import { CheckSignInProcessByEmailPasswordInterface } from '../../infrastructure/interfaces';
import { RoleEnum } from 'src/common';

export class CheckUserSignInMap {
  static async signInProcessByEmail(
    exist: boolean,
    login: boolean,
    user?: User,
  ): Promise<CheckSignInProcessByEmailPasswordInterface> {
    return {
      is_exist: exist,
      is_login: login,
      user: {
        user_id: user?.id || null,
        username: user?.username || null,
        email: user?.email || null,
        first_name: user?.firstName || null,
        last_name: user?.lastName || null,
        avatar: user?.avatar || null,
        role: user?.role || RoleEnum.USER,
      },
    };
  }
}
