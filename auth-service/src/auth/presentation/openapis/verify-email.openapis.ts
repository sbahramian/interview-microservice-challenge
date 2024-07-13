import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { SignUpResponseDto } from '../dto';

export const VerifyEmailInformation: ApiOperationOptions = {
  summary: 'Verify user email',
  description: 'Verify user email API',
};

export const VerifyEmailInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Verify email process has been successful.',
  type: SignUpResponseDto,
};
