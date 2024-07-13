import { User } from '@prisma/client';
import { CheckSignUpProcessByEmailInterface } from '../../infrastructure/interfaces';

export class CheckUserMap {
  static async signUpProcessByEmail(exist: boolean, user?: User): Promise<CheckSignUpProcessByEmailInterface> {
    return {
      is_exist: exist,
      user: {
        user_id: user?.id || null,
        username: user?.username || null,
        email: user?.email || null,
        first_name: user?.firstName || null,
        last_name: user?.lastName || null,
        avatar: user?.avatar || null,
        role: user?.role,
      },
    };
  }
}
