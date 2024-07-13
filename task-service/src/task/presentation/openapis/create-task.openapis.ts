import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetTaskResponseDto } from '../dto';

export const CreateNewTask: ApiOperationOptions = {
  summary: 'Create new task',
  description: 'Create new task API',
};

export const CreateTaskBadRequestResponse: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Task input value not valid.',
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Task input value not valid.',
    },
  },
};

export const CreateTaskConflictResponse: ApiResponseOptions = {
  status: HttpStatus.CONFLICT,
  description: 'Task is already registered. please send new task.',
  schema: {
    example: {
      statusCode: HttpStatus.CONFLICT,
      message: 'Task is already registered. please send new task.',
    },
  },
};

export const CreateTaskInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.CREATED,
  description: 'Create task process has been successful.',
  type: GetTaskResponseDto,
};
