import { CheckOtpCodeHandler } from './check-otp-code';
import { CheckOtpTokenHandler } from './check-otp-token';
import { CheckRefreshTokenHandler } from './check-refresh-token';
import { CheckSignInHandler } from './check-sign-in';

export * from './check-otp-code';
export * from './check-otp-token';
export * from './check-refresh-token';
export * from './check-sign-in';

export const QueryHandlers = [CheckOtpCodeHandler, CheckOtpTokenHandler, CheckRefreshTokenHandler, CheckSignInHandler];
