import { Global, Module } from '@nestjs/common';
import { AdminV1TaskController, ClientV1TaskController } from '../../presentation/controllers';
import { TaskUseCase } from '../../application/usecases';
import { CommandHandlers } from '../../application/services/command';
import { QueryHandlers } from '../../application/services/query';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/task/domain/services/prisma';
import { TaskPrismaRepository } from 'src/task/domain/services/repositories';
import { TaskPrismaFactory } from 'src/task/domain/services/factories';
import { AesUtility, JWT_SECRET_CONSTANT } from 'src/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: JWT_SECRET_CONSTANT }),
    CqrsModule,
  ],
  controllers: [ClientV1TaskController, AdminV1TaskController],
  providers: [
    // Utility
    AesUtility,
    // UseCase
    TaskUseCase,
    // Handler
    ...QueryHandlers,
    ...CommandHandlers,
    // Service
    PrismaService,
    // Factory
    TaskPrismaFactory,
    // Repository
    TaskPrismaRepository,
  ],
  exports: [],
})
export class TaskModule {}
