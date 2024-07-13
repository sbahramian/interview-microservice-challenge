import { MetaInterface } from 'src/common';

export interface SignupUserAccountInterface {
  first_name: string;
  last_name: string;
  username: string;
}

export interface SignupUserAccountResponse {
  data: {
    is_updated: boolean;
  };
  meta: MetaInterface;
}
