import { RoleEnum } from 'src/common';

export interface NewUserInterface {
  avatar: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: RoleEnum;
}
