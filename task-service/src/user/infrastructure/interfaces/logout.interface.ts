import { MetaInterface } from 'src/common';

export interface LogoutRequestInterface {
  device_id: string;
}

export interface LogoutDataResponseInterface {
  is_applied: boolean;
}

export interface LogoutResponseInterface {
  data: LogoutDataResponseInterface;
  meta: MetaInterface;
}
