import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CommonResponseOpenApi } from 'src/common';
import { GetTaskInformationForUpdateNotFoundResponse, UpdateNewTask, UpdateTaskBadRequestResponse } from '../openapis';

export function UpdateTaskOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(UpdateNewTask),
    ApiResponse(UpdateTaskBadRequestResponse),
    ApiResponse(GetTaskInformationForUpdateNotFoundResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
