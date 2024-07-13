import { Controller, UseInterceptors, UseGuards, Version, Headers, Get, Body, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../../auth/application/guards';
import { DefaultHeadersInterceptor } from 'src/common/interceptor';
import { RegisterUserUseCase, UserInformationUseCase } from 'src/user/application/usecases';
import { GetLanguageDto, GetVersionDto } from 'src/common';
import { RestAuth } from 'src/auth/infrastructure/decorators';
import { JwtPayloadInterface } from 'src/auth/infrastructure/interfaces';
import { GetUserProfileOpenApiDecorator, UpdateUserProfileOpenApiDecorator } from '../../decorators';
import { GetUserProfileResponseDto, UpdateUserProfileRequestDto, UpdateUserProfileResponseDto } from '../../dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(new DefaultHeadersInterceptor())
@ApiTags('User [Client]')
@Controller('client/v1/user')
export class ClientV1UserController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly userInformationUseCase: UserInformationUseCase,
  ) {}

  @Version('1')
  @Get('/profile')
  @GetUserProfileOpenApiDecorator()
  public async GetMe(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @RestAuth() auth: JwtPayloadInterface,
  ): Promise<GetUserProfileResponseDto> {
    return this.userInformationUseCase.GetMe(auth.user.user_id, language);
  }

  @Version('1')
  @Patch('/profile/update')
  @UpdateUserProfileOpenApiDecorator()
  public async UpdateUserProfile(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Body() user_profile: UpdateUserProfileRequestDto,
    @RestAuth() auth: JwtPayloadInterface,
  ): Promise<UpdateUserProfileResponseDto> {
    return this.registerUserUseCase.UpdateUserProfile(auth.user.user_id, user_profile, language);
  }
}
