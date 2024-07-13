import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AesUtility } from '../services/utilities';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_CONSTANT } from '../../infrastructure/constant';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import { TokenTypeEnum, localiczation } from 'src/common';

@Injectable()
export class ConfigsGuard implements CanActivate {
  constructor(
    private readonly aesUtility: AesUtility,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> | never {
    const request = context.switchToHttp().getRequest();

    try {
      const authorization: string = request.headers.authorization;
      if (!authorization) {
        return true;
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
}
