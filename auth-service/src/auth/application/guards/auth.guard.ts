import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import { AesUtility } from '../services/utilities';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_CONSTANT } from '../../infrastructure/constant';
import { TokenTypeEnum, UserStatusEnum, localiczation } from 'src/common';

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
              ...localiczation.message(LocalizationMessage.UNAUTHORIZED, null, true),
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
              ...localiczation.message(LocalizationMessage.UNAUTHORIZED, null, true),
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
              ...localiczation.message(LocalizationMessage.UNAUTHORIZED, null, true),
            },
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      request.jwt = payload;

      return true;
    } catch (error) {
      throw new HttpException(
        {
          meta: {
            ...localiczation.message(LocalizationMessage.UNAUTHORIZED, null, true),
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
            ...localiczation.message(LocalizationMessage.UNAUTHORIZED, null, true),
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (jwt.user.status == UserStatusEnum.BANNED) {
      throw new HttpException(
        {
          meta: {
            ...localiczation.message(LocalizationMessage.USER_BANNED, null, true),
          },
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    return jwt;
  }
}
