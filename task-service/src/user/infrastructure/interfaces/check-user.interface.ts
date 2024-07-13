export interface CheckEmailExistInterface {
  email: string;
}

export interface CheckUserIdExistInterface {
  user_id: number;
}

export interface CheckSignUpProcessByEmailUserPayloadInterface {
  user_id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface CheckSignUpProcessByEmailInterface {
  is_exist: boolean;
  user: CheckSignUpProcessByEmailUserPayloadInterface;
}

export interface CheckSignInProcessByEmailPasswordInterface {
  is_exist: boolean;
  is_login: boolean;
  user: CheckSignUpProcessByEmailUserPayloadInterface;
}

export interface GetUserJwtPayloadByIdRequestInterface {
  user_id: number;
  lang: string;
}

export interface CheckSignUpProcessByIdRequestInterface {
  user_id: number;
}

export interface CheckAllAdminRequestInterface {
  user_ids: number[];
}
