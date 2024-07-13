import { MetaInterface } from 'src/common';

export interface UserIdExistInterface {
  is_exist: boolean;
}

export interface CheckUserIdExistResponse {
  data: UserIdExistInterface;
  meta: MetaInterface;
}
