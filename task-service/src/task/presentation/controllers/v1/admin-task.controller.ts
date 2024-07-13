import { Controller, Version, Get, Headers, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTaskFeedsResponseDto } from '../../dto';
import { TaskUseCase } from '../../../application/usecases';
import { GetTaskFeedOpenApiDecorator } from '../../decorators';
import { DefaultHeadersInterceptor } from 'src/common/interceptor';
import { GetLanguageDto, GetVersionDto } from 'src/common';
import { AuthAdminGuard } from 'src/common/guards';

@ApiBearerAuth()
@UseGuards(AuthAdminGuard)
@UseInterceptors(new DefaultHeadersInterceptor())
@ApiTags('Task [Admin]')
@Controller('admin/v1/task')
export class AdminV1TaskController {
  constructor(private readonly taskUseCase: TaskUseCase) {}

  @Version('1')
  @Get('feeds')
  @GetTaskFeedOpenApiDecorator()
  public async GetTaskFeed(
    @Headers() { language }: GetLanguageDto,  
    @Headers() {}: GetVersionDto,
  ): Promise<GetTaskFeedsResponseDto> {
    return this.taskUseCase.GetTaskFeed(language);
  }
}
