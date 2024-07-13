import { Controller, Post, Body, Headers, Version, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  SignUpRequestDto,
  SignUpResponseDto,
  VerifyCodeRequestDto,
  VerifyCodeResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  SingInRequestDto,
  SingInResponseDto,
} from '../../dto';
import {
  SignUpOpenApiDecorator,
  VerifyCodeOpenApiDecorator,
  RefreshTokenOpenApiDecorator,
  SingInOpenApiDecorator,
} from '../../decorators';
import { AuthByEmailUseCase, AuthTokenUseCase } from '../../../application/usecases';
import { GetLanguageDto } from 'src/common/dto';
import { GetVersionDto } from 'src/common/dto';
import { DefaultHeadersInterceptor } from 'src/common/interceptor';

@UseInterceptors(new DefaultHeadersInterceptor())
@ApiTags('Auth [Client]')
@Controller('client/v1/auth')
export class ClientV1AuthController {
  constructor(
    private readonly authByEmailUseCase: AuthByEmailUseCase,
    private readonly authTokenUseCase: AuthTokenUseCase,
  ) {}

  @Version('1')
  @Post('/sing-up')
  @SignUpOpenApiDecorator()
  public async SignUp(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Body() data: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    return this.authByEmailUseCase.SignUp(data, language);
  }

  @Version('1')
  @Post('/sing-up/verify')
  @VerifyCodeOpenApiDecorator()
  public async VerifyCode(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Body() data: VerifyCodeRequestDto,
  ): Promise<VerifyCodeResponseDto> {
    return this.authByEmailUseCase.VerifyCode(data, language);
  }

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
