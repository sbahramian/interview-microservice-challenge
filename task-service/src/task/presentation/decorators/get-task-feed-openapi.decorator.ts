import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonResponseOpenApi } from 'src/common';
import { GetTasksFeedInformation, GetTasksFeedsSuccessResponse, GetTaskInformationNotFoundResponse } from '../openapis';

export function GetTaskFeedOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(GetTasksFeedInformation),
    ApiResponse(GetTasksFeedsSuccessResponse),
    ApiResponse(GetTaskInformationNotFoundResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
