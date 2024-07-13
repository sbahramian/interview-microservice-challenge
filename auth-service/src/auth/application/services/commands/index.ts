import { GenerateOtpHandler } from './generate-otp-code';
import { GenerateJwtTokenHandler } from './generate-jwt-token';
import { DeleteJwtTokenHandler } from './delete-jwt-token';
import { DeleteOtpCodeHandler } from './delete-otp-code';

export * from './generate-otp-code';
export * from './generate-jwt-token';
export * from './delete-jwt-token';
export * from './delete-otp-code';

export const CommandHandlers = [
  GenerateOtpHandler,
  GenerateJwtTokenHandler,
  DeleteJwtTokenHandler,
  DeleteOtpCodeHandler,
];
