import { Injectable } from '@nestjs/common';
import { RegisterAdminUseCase } from '../../usecases';

@Injectable()
export class AdminSeederService {
  constructor(private readonly registerAdminUseCase: RegisterAdminUseCase) {}

  public async ImportSeederAdmin(): Promise<void> {
    try {
      await this.registerAdminUseCase.RegisterUserByEmail({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        first_name: 'admin',
        last_name: 'user',
        lang: 'en',
      });
    } catch (error) {}
  }
}
