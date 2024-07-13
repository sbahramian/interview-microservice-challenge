import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SingInInformation, SingInBadRequestResponse, SingInInformationSuccessResponse } from '../openapis';
import { CommonResponseOpenApi } from 'src/common';

export function SingInOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(SingInInformation),
    ApiResponse(SingInBadRequestResponse),
    ApiResponse(SingInInformationSuccessResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.TooManyRequestResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
