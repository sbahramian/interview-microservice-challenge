import { EmailExistHandler } from './email-exist';
import { GetUserProfileByIdHandler } from './get-user-profile-by-id';
import { GetMeHandler } from './get-me';
import { UserVerificationStatusHandler } from './user-verification-status';
import { GetUserJwtPayloadByIdHandler } from './get-user-jwt-payload-by-id';
import { CheckSignUpProcessByEmailHandler } from './check-signup-process-by-email';
import { CheckSignUpProcessByUserIdHandler } from './check-signup-process-by-user-id';
import { UserIdExistHandler } from './user-id-exist';
import { CheckAdminUserPermissionHandler } from './check-admin-user-permission';
import { CheckSignInByEmailPasswordHandler } from './check-sign-in-by-email-password';
import { CheckSignInAdminByEmailPasswordHandler } from './check-sign-in-admin-by-email-password';

export * from './email-exist';
export * from './get-user-profile-by-id';
export * from './get-me';
export * from './user-verification-status';
export * from './check-signup-process-by-email';
export * from './get-user-jwt-payload-by-id';
export * from './check-signup-process-by-user-id';
export * from './user-id-exist';
export * from './check-admin-user-permission';
export * from './check-sign-in-by-email-password';
export * from './check-sign-in-admin-by-email-password';

export const QueryHandlers = [
  GetUserProfileByIdHandler,
  GetMeHandler,
  EmailExistHandler,
  UserVerificationStatusHandler,
  GetUserJwtPayloadByIdHandler,
  CheckSignUpProcessByEmailHandler,
  CheckSignUpProcessByUserIdHandler,
  UserIdExistHandler,
  CheckAdminUserPermissionHandler,
  CheckSignInByEmailPasswordHandler,
  CheckSignInAdminByEmailPasswordHandler,
];
