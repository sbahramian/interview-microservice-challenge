import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { UpdateUserProfile, UpdateUserProfileBadRequestResponse, UpdateUserProfileSuccessResponse } from '../openapis';
import { CommonResponseOpenApi } from 'src/common';

export function UpdateUserProfileOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(UpdateUserProfile),
    ApiResponse(UpdateUserProfileBadRequestResponse),
    ApiResponse(UpdateUserProfileSuccessResponse),
    ApiResponse(CommonResponseOpenApi.UnauthorizedResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
