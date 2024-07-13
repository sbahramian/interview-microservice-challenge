import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyEmailInformation, VerifyEmailInformationSuccessResponse } from '../openapis';
import { CommonResponseOpenApi } from 'src/common';

export function SignUpOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(VerifyEmailInformation),
    ApiResponse(VerifyEmailInformationSuccessResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
  );
}
