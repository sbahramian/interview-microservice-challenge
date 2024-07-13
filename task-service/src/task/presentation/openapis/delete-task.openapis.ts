import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { DeleteTasksResponseDto } from '../dto';

export const DeleteNewTask: ApiOperationOptions = {
  summary: 'Delete task information',
  description: 'Delete task information API',
};

export const DeleteTaskInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Delete task information process has been successful.',
  type: DeleteTasksResponseDto,
};

export const GetTaskInformationForDeleteNotFoundResponse: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'There is not any Task with id',
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There is not any Task with id',
    },
  },
};
