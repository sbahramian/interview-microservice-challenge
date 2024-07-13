import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetTaskResponseDto } from '../dto';

export const GetTaskInformation: ApiOperationOptions = {
  summary: 'Get Task information by id',
  description: 'Get Task information API',
};

export const GetTaskInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Get task information process has been successful.',
  type: GetTaskResponseDto,
};

export const GetTaskInformationByIdNotFoundResponse: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'There is not any Task with id',
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There is not any Task with id',
    },
  },
};
