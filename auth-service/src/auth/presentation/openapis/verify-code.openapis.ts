import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { VerifyCodeResponseDto } from '../dto';

export const VerifyCodeInformation: ApiOperationOptions = {
  summary: 'Verify otp code',
  description: 'Verify otp code API',
};

export const VerifyCodeBadRequestResponse: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'Confirmation code or otp token not valid.',
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Confirmation code or otp token not valid.',
    },
  },
};

export const VerifyCodeInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Verify code process has been successful.',
  type: VerifyCodeResponseDto,
};
