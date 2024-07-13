import { Global, Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserPrismaFactory, UserRedisFactory } from '../../domain/services/factories';
import { UserPrismaRepository, UserRedisRepository } from '../../domain/services/repositories';
import {
  CheckUserUseCase,
  LoginUserUseCase,
  RegisterAdminUseCase,
  RegisterUserUseCase,
  UserInformationUseCase,
} from '../../application/usecases';
import { QueryHandlers } from '../../application/services/queries';
import { CommandHandlers } from '../../application/services/commands';
import { AuthModule } from '../../../auth/infrastructure/module';
import { UserKeyManagerUtility } from '../../application/services/utilities';
import { PrismaService } from 'src/user/domain/services/prisma';
import { ClientV1UserController } from 'src/user/presentation/controllers';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransportNameEnum } from 'src/common';
import { ConfigService } from '@nestjs/config';
import { AdminSeederService } from 'src/user/application/services/seeder';

@Global()
@Module({
  imports: [
    CqrsModule,
    forwardRef(() => AuthModule),
    ClientsModule.registerAsync([
      {
        name: TransportNameEnum.TASK_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [configService.get<string>('KAFKA_BROKERS')],
            },
            consumer: {
              groupId: configService.get<string>('KAFKA_CONSUMER_GROUP_ID'),
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ClientV1UserController],
  providers: [
    // Utility
    UserKeyManagerUtility,
    // Usecase
    LoginUserUseCase,
    RegisterUserUseCase,
    CheckUserUseCase,
    UserInformationUseCase,
    RegisterAdminUseCase,
    // Handler
    ...QueryHandlers,
    ...CommandHandlers,
    // Seeder
    AdminSeederService,
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
    LoginUserUseCase,
    RegisterUserUseCase,
    CheckUserUseCase,
    UserInformationUseCase,
  ],
})
export class UserModule {}
