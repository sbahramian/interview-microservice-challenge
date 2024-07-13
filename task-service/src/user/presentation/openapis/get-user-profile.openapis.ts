import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { GetUserProfileResponseDto } from '../dto';

export const GetUserProfile: ApiOperationOptions = {
  summary: 'Get user profile information',
  description: 'Get user profile information API',
};

export const GetUserProfileSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Get user profile process has been successful.',
  type: GetUserProfileResponseDto,
};
