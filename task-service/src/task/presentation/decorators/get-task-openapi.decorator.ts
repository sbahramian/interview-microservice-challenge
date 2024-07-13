import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonResponseOpenApi } from 'src/common';
import { GetTasksInformation, GetTasksSuccessResponse, GetTasksInformationNotFoundResponse } from '../openapis';

export function GetTaskOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(GetTasksInformation),
    ApiResponse(GetTasksInformationNotFoundResponse),
    ApiResponse(GetTasksSuccessResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
