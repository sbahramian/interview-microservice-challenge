import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonResponseOpenApi } from 'src/common';
import {
  GetTaskInformation,
  GetTaskInformationByIdNotFoundResponse,
  GetTaskInformationSuccessResponse,
} from '../openapis';

export function GetTaskByIdOpenApiDecorator() {
  return applyDecorators(
    ApiOperation(GetTaskInformation),
    ApiResponse(GetTaskInformationSuccessResponse),
    ApiResponse(GetTaskInformationByIdNotFoundResponse),
    ApiResponse(CommonResponseOpenApi.InternalServerErrorResponse),
    ApiResponse(CommonResponseOpenApi.ServiceUnavaiableResponse),
    ApiResponse(CommonResponseOpenApi.UserBannedResponse),
  );
}
