import { RoleEnum } from 'src/common';

export interface NewUserInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
}
