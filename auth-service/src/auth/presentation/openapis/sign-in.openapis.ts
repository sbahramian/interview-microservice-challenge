import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { SingInResponseDto } from '../dto';

export const SingInInformation: ApiOperationOptions = {
  summary: 'Sing in',
  description: 'Sing in API',
};

export const SingInBadRequestResponse: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Confirmation email or password not valid.',
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Confirmation email or password not valid.',
    },
  },
};

export const SingInInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Sing in process has been successful.',
  type: SingInResponseDto,
};
