import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadInterface } from '../interfaces';

export const RestAuth = createParamDecorator((_data: unknown, ctx: ExecutionContext): JwtPayloadInterface => {
  const request = ctx.switchToHttp().getRequest();
  return request.jwt;
});

export const RestConfigs = createParamDecorator((_data: unknown, ctx: ExecutionContext): JwtPayloadInterface => {
  const request = ctx.switchToHttp().getRequest();
  if (request?.jwt) return request.jwt;

  return {
    user: {
      user_id: null,
    },
  };
});
