import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPrismaFactory, UserRedisFactory } from '../../domain/services/factories';
import { UserPrismaRepository, UserRedisRepository } from '../../domain/services/repositories';
import { UserKeyManagerUtility } from '../../application/services/utilities';
import { PrismaService } from 'src/user/domain/services/prisma';
import { ClientV1UserController } from 'src/user/presentation/controllers';
import { AesUtility, JWT_SECRET_CONSTANT } from 'src/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserRegisterEventsService } from 'src/user/application/services/events';
import { CommandHandlers } from 'src/user/application/services/commands';
import { RegisterUserUseCase } from 'src/user/application/usecases/register-user.usecase';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: JWT_SECRET_CONSTANT }),
    CqrsModule,
  ],
  controllers: [ClientV1UserController],
  providers: [
    // Utility
    AesUtility,
    UserKeyManagerUtility,
    // Usecase
    RegisterUserUseCase,
    // Handler
    // ...QueryHandlers,
    ...CommandHandlers,
    // Events
    UserRegisterEventsService,
    // Service
    PrismaService,
    // Factory
    UserPrismaFactory,
    UserRedisFactory,
    // Repository
    UserPrismaRepository,
    UserRedisRepository,
  ],
  exports: [
    // Usecase
  ],
})
export class UserModule {}
