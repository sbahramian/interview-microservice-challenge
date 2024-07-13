import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  RefreshTokenInformation,
  RefreshTokenBadRequestResponse,
  RefreshTokenInformationSuccessResponse,
} from '../openapis';
import { CommonResponseOpenApi } from 'src/common';

export function RefreshTokenOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(RefreshTokenInformation),
    ApiResponse(RefreshTokenBadRequestResponse),
    ApiResponse(RefreshTokenInformationSuccessResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
  );
}
