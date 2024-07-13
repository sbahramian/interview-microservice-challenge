import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export const UpdateNewTask: ApiOperationOptions = {
  summary: 'Update task information',
  description: 'Update task information API',
};

export const UpdateTaskBadRequestResponse: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Task input value not valid.',
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Task input value not valid.',
    },
  },
};

export const GetTaskInformationForUpdateNotFoundResponse: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'There is not any Task with id',
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There is not any Task with id',
    },
  },
};
