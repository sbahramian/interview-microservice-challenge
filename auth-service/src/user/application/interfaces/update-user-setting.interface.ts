import { MetaInterface } from 'src/common';

export interface UpdateUserSettingDataResponseInterface {
  is_updated: boolean;
}

export interface UpdateUserSettingResponseInterface {
  data: UpdateUserSettingDataResponseInterface;
  meta: MetaInterface;
}
