import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CommonResponseOpenApi } from 'src/common';
import {
  CreateNewTask,
  CreateTaskConflictResponse,
  CreateTaskBadRequestResponse,
  CreateTaskInformationSuccessResponse,
} from '../openapis';

export function CreateTaskOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(CreateNewTask),
    ApiResponse(CreateTaskBadRequestResponse),
    ApiResponse(CreateTaskConflictResponse),
    ApiResponse(CreateTaskInformationSuccessResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
