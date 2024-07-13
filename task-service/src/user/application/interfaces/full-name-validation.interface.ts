import { MetaInterface } from 'src/common';

export interface FullNameValidationInterface {
  is_valid: boolean;
}

export interface FullNameValidationResponse {
  data?: FullNameValidationInterface;
  meta: MetaInterface;
}
