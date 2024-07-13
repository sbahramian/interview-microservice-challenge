import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { GetUserProfile, GetUserProfileSuccessResponse } from '../openapis';
import { CommonResponseOpenApi } from 'src/common';

export function GetUserProfileOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(GetUserProfile),
    ApiResponse(GetUserProfileSuccessResponse),
    ApiResponse(CommonResponseOpenApi.UnauthorizedResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
