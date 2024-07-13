import { RoleEnum } from 'src/common';

export interface RegisterUserByEmailInterface {
  email: string;
  lang: string;
}

export interface RegisterNewUserByEmailInterface {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: RoleEnum;
}

export interface CreateUserInterface {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface UpdateUserProfileInterface {
  first_name: string;
  last_name: string;
}
