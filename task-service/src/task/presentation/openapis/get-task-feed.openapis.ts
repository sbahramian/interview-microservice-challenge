import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetTaskFeedsResponseDto } from '../dto';

export const GetTasksFeedInformation: ApiOperationOptions = {
  summary: 'Get Tasks Feeds for App',
  description: 'Get Tasks Feeds for App API',
};

export const GetTasksFeedsSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Get tasks information process has been successful.',
  type: GetTaskFeedsResponseDto,
};

export const GetTaskInformationNotFoundResponse: ApiResponseOptions = {
  status: HttpStatus.NOT_FOUND,
  description: 'There is not any Task with id',
  schema: {
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'There is not any Task with id',
    },
  },
};
