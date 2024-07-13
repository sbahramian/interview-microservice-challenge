import { SetMetadata } from '@nestjs/common';
import { CHECK_POLICY_KEY } from '../constant';
import { ActionEnum, ResourceEnum, ScopeEnum } from 'src/common';

export const SetPolicy = (action: ActionEnum, resource: ResourceEnum, scope: ScopeEnum) =>
  SetMetadata(CHECK_POLICY_KEY, { action, resource, scope });
