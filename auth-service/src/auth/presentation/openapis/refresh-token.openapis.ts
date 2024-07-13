import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { VerifyCodeResponseDto } from '../dto';

export const RefreshTokenInformation: ApiOperationOptions = {
  summary: 'Refresh Token',
  description: 'Refresh Token API',
};

export const RefreshTokenBadRequestResponse: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'The refresh token is not valid!',
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'The refresh token is not valid!',
    },
  },
};

export const RefreshTokenInformationSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Refresh token process has been successful.',
  type: VerifyCodeResponseDto,
};
