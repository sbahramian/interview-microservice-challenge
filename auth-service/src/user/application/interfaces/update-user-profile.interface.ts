import { MetaInterface } from 'src/common';

export interface UpdateUserProfileInterface {
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export interface UserPayloadResponseInterface {
  user_id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface UpdateUserProfilePayloadResponseInterface {
  user: UserPayloadResponseInterface;
  is_updated: boolean;
  need_authorization: boolean;
}

export interface UpdateUserProfileResponse {
  data: UpdateUserProfilePayloadResponseInterface;
  meta: MetaInterface;
}
