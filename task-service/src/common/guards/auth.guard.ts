import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AesUtility, JWT_SECRET_CONSTANT, RoleEnum, TokenTypeEnum, UserStatusEnum, localization } from 'src/common';
import { LocalizationMessage } from '../localization/enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly aesUtility: AesUtility,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> | never {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization: string = request.headers.authorization;
      if (!authorization) {
        throw new HttpException(
          {
            meta: {
              ...localization.message(LocalizationMessage.UNAUTHORIZED, null, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const bearer: string[] = authorization.split(' ');
      if (!bearer || bearer.length < 2) {
        throw new HttpException(
          {
            meta: {
              ...localization.message(LocalizationMessage.UNAUTHORIZED, null, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const token: string = bearer[1];

      const decode_token = await this.aesUtility.Decrypt(token);
      const payload = await this.jwtService.verifyAsync(decode_token, {
        secret: JWT_SECRET_CONSTANT,
      });

      if (payload.sub !== TokenTypeEnum.ACCESS_TOKEN) {
        throw new HttpException(
          {
            meta: {
              ...localization.message(LocalizationMessage.UNAUTHORIZED, null, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      request.jwt = payload;

      if (payload?.user.role !== RoleEnum.USER) {
        throw new HttpException(
          {
            meta: {
              ...localization.message(LocalizationMessage.UNAUTHORIZED, null, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return true;
    } catch (error) {
      throw new HttpException(
        {
          meta: {
            ...localization.message(LocalizationMessage.UNAUTHORIZED, null, true),
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  handleRequest<Authentication = any>(err: any, jwt: any): Authentication {
    if (err || !jwt) {
      throw new HttpException(
        {
          meta: {
            ...localization.message(LocalizationMessage.UNAUTHORIZED, null, true),
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (jwt.user.status == UserStatusEnum.BANNED) {
      throw new HttpException(
        {
          meta: {
            ...localization.message(LocalizationMessage.USER_BANNED, null, true),
          },
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return jwt;
  }
}
