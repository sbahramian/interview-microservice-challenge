import { Global, INestApplication, Injectable, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

@Injectable()
export class ShutdownService implements OnModuleDestroy {
  constructor(private readonly app: INestApplication) {}

  async onModuleDestroy() {
    await this.app.close();
    console.log('Application closed gracefully');
  }
}

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
@Global()
export class PrismaModule {}
