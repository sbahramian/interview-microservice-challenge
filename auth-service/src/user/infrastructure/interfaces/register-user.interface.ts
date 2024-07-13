export interface RegisterUserByEmailInterface {
  email: string;
  lang: string;
}

export interface RegisterNewUserByEmailInterface {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  lang: string;
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
