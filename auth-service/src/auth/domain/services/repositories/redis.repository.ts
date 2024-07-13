import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { BaseRedisRepository } from 'src/common/repositories';

@Injectable()
export class AuthRedisRepository extends BaseRedisRepository {
  constructor(@InjectRedis() protected readonly redisClient: Redis) {
    super(redisClient);
  }
}
