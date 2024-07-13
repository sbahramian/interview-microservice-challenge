import { ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetTasksResponseDto } from '../dto';

export const GetTasksInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Get tasks information process has been successful.',
  type: GetTasksResponseDto,
};
