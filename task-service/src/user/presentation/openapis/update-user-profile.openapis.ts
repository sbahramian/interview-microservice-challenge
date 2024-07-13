import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { UpdateUserProfileResponseDto } from '../dto';

export const UpdateUserProfile: ApiOperationOptions = {
  summary: 'Update user profile information',
  description: 'Update user profile information API',
};

export const UpdateUserProfileSuccessResponse: ApiResponseOptions = {
  status: HttpStatus.OK,
  description: 'Update user profile process has been successful.',
  type: UpdateUserProfileResponseDto,
};

export const UpdateUserProfileBadRequestResponse: ApiResponseOptions = {
  status: HttpStatus.BAD_REQUEST,
  description: 'User profile input value not valid.',
  schema: {
    example: {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'User profile input value not valid.',
    },
  },
};
