import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetTasksResponseDto } from '../dto';

export const GetTasksInformation: ApiOperationOptions = {
  summary: 'Get Tasks list',
  description: 'Get Tasks information API',
};

export const GetTasksSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Get tasks information process has been successful.',
  type: GetTasksResponseDto,
};

export const GetTasksInformationNotFoundResponse: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'There is not any Task with id',
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There is not any Task with id',
    },
  },
};
