import { MetaInterface } from 'src/common';

export interface GetUserProfileResponseInterface {
  user_id: number;
  avatar: string;
  cover: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

export interface GetUserProfileResponse {
  data: {
    user: GetUserProfileResponseInterface;
  };
  meta: MetaInterface;
}
