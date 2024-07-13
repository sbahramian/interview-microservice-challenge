import { MetaInterface } from 'src/common';

export interface GetMeResponseInterface {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface GetMeResponse {
  data: {
    user: GetMeResponseInterface;
  };
  meta: MetaInterface;
}
