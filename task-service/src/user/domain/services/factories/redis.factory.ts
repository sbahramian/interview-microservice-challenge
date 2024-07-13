import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { BaseRedisFactory } from 'src/common/factories';

@Injectable()
export class UserRedisFactory extends BaseRedisFactory {
  constructor(@InjectRedis() protected readonly redisClient: Redis) {
    super(redisClient);
  }
}
