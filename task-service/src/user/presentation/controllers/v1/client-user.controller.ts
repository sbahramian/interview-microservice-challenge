import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DefaultHeadersInterceptor } from 'src/common/interceptor';
import { AuthGuard } from 'src/common/guards';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(new DefaultHeadersInterceptor())
@ApiTags('User [Client]')
@Controller('client/v1/user')
export class ClientV1UserController {
  constructor() {}
}
