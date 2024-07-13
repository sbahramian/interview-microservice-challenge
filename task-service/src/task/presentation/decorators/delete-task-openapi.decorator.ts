import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CommonResponseOpenApi } from 'src/common';
import {
  DeleteNewTask,
  DeleteTaskInformationSuccessResponse,
  GetTaskInformationForDeleteNotFoundResponse,
} from '../openapis';

export function DeleteTaskOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(DeleteNewTask),
    ApiResponse(DeleteTaskInformationSuccessResponse),
    ApiResponse(GetTaskInformationForDeleteNotFoundResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
