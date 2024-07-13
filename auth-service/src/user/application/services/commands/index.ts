import { UpdateUserProfileHandler } from './update-user-profile';
import { RegisterUserByEmailHandler } from './register-user-by-email';
import { SignupUserAccountHandler } from './signup-user-account';
import { RegisterAdminByEmailHandler } from './register-admin-by-email';

export * from './update-user-profile';
export * from './register-user-by-email';
export * from './signup-user-account';
export * from './register-admin-by-email';

export const CommandHandlers = [
  UpdateUserProfileHandler,
  RegisterAdminByEmailHandler,
  RegisterUserByEmailHandler,
  SignupUserAccountHandler,
];
