import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ActionEnum, CHECK_POLICY_KEY, ResourceEnum, ScopeEnum, localization } from 'src/common';
import { LocalizationMessage } from '../localization/enum';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> | never {
    try {
      const ctxClass = context.getClass();
      const ctxHandler = context.getHandler();
      const { action, resource, scope }: { action: ActionEnum; resource: ResourceEnum; scope: ScopeEnum } =
        this.reflector.getAllAndOverride<{
          action: ActionEnum;
          resource: ResourceEnum;
          scope: ScopeEnum;
        }>(CHECK_POLICY_KEY, [ctxHandler, ctxClass]);

      if (!action || !resource || !scope)
        throw new HttpException(
          {
            meta: {
              ...localization.message(LocalizationMessage.POLICY_ENDPOINT_ERROR, null, true),
            },
          },
          HttpStatus.FAILED_DEPENDENCY,
        );

      return true;
    } catch (error) {
      throw new HttpException(
        {
          meta: {
            ...localization.message(LocalizationMessage.POLICY_ENDPOINT_ERROR, null, true),
          },
        },
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }
}
