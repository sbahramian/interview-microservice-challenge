import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyCodeInformation, VerifyCodeBadRequestResponse, VerifyCodeInformationSuccessResponse } from '../openapis';
import { CommonResponseOpenApi } from 'src/common';

export function VerifyCodeOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(VerifyCodeInformation),
    ApiResponse(VerifyCodeBadRequestResponse),
    ApiResponse(VerifyCodeInformationSuccessResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
