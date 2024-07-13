import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetLanguageDto, GetVersionDto, JwtPayloadInterface, LanguageListEnum, RestAuth } from 'src/common';
import {
  Controller,
  Version,
  Get,
  HttpStatus,
  Param,
  Post,
  Body,
  Patch,
  HttpCode,
  Headers,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { TaskUseCase } from '../../../application/usecases';
import {
  GetTaskIdRequestDto,
  AddNewTaskRequestDto,
  UpdateTaskDto,
  GetTaskResponseDto,
  GetTasksResponseDto,
  UpdateTasksResponseDto,
  DeleteTasksResponseDto,
} from '../../dto';
import {
  GetTaskOpenApiDecorator,
  CreateTaskOpenApiDecorator,
  UpdateTaskOpenApiDecorator,
  DeleteTaskOpenApiDecorator,
  GetTaskByIdOpenApiDecorator,
} from '../../decorators';
import { DefaultHeadersInterceptor } from 'src/common/interceptor';
import { AuthGuard } from 'src/common/guards';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@UseInterceptors(new DefaultHeadersInterceptor())
@ApiTags('Task [Client]')
@Controller('client/v1/task')
export class ClientV1TaskController {
  constructor(private readonly taskUseCase: TaskUseCase) {}

  @Version('1')
  @Get('')
  @GetTaskOpenApiDecorator()
  public async GetTasks(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @RestAuth() auth: JwtPayloadInterface,
  ): Promise<GetTasksResponseDto> {
    return this.taskUseCase.GetTasks(auth.user.user_id, language);
  }

  @Version('1')
  @Get('/:taskId')
  @GetTaskByIdOpenApiDecorator()
  @HttpCode(HttpStatus.OK)
  public async GetTaskById(
    @Headers() { language = LanguageListEnum.ENGLISH }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Param() { taskId }: GetTaskIdRequestDto,
  ): Promise<GetTaskResponseDto> {
    return this.taskUseCase.GetTaskById(taskId, language);
  }

  @Version('1')
  @Post('')
  @CreateTaskOpenApiDecorator()
  public async CreateTask(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Body() new_task: AddNewTaskRequestDto,
    @RestAuth() auth: JwtPayloadInterface,
  ): Promise<GetTaskResponseDto> {
    return this.taskUseCase.CreateTask(auth.user.user_id, new_task, language);
  }

  @Version('1')
  @Patch('/:taskId')
  @UpdateTaskOpenApiDecorator()
  public async UpdateTask(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Param() { taskId }: GetTaskIdRequestDto,
    @Body() item_task: UpdateTaskDto,
  ): Promise<UpdateTasksResponseDto> {
    return this.taskUseCase.UpdateTask(taskId, item_task, language);
  }

  @Version('1')
  @Delete('/:taskId/delete')
  @DeleteTaskOpenApiDecorator()
  public async DeleteTask(
    @Headers() { language }: GetLanguageDto,
    @Headers() {}: GetVersionDto,
    @Param() { taskId }: GetTaskIdRequestDto,
  ): Promise<DeleteTasksResponseDto> {
    return this.taskUseCase.DeleteTask(taskId, language);
  }
}
