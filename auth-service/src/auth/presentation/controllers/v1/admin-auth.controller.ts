import { Controller, Post, Body, Headers, Version, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenRequestDto, RefreshTokenResponseDto, SingInRequestDto, SingInResponseDto } from '../../dto';
import { RefreshTokenOpenApiDecorator, SingInOpenApiDecorator } from '../../decorators';
import { AuthAdminByEmailUseCase, AuthTokenUseCase } from '../../../application/usecases';
import { GetLanguageDto } from 'src/common/dto';
import { GetVersionDto } from 'src/common/dto';
import { DefaultHeadersInterceptor } from 'src/common/interceptor';

@UseInterceptors(new DefaultHeadersInterceptor())
@ApiTags('Auth [Admin]')
@Controller('admin/v1/auth')
export class AdminV1AuthController {
  constructor(
    private readonly authByEmailUseCase: AuthAdminByEmailUseCase,
    private readonly authTokenUseCase: AuthTokenUseCase,
  ) {}

  @Version('1')
  @Post('/sing-in')
  @SingInOpenApiDecorator()
  public async SingIn(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Body() data: SingInRequestDto,
  ): Promise<SingInResponseDto> {
    return this.authByEmailUseCase.SignIn(data, language);
  }

  @Version('1')
  @Post('/oauth/refresh-token')
  @RefreshTokenOpenApiDecorator()
  public async RefreshToken(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Body() data: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.authTokenUseCase.RefreshToken(data, language);
  }
}
