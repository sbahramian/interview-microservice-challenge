import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { BaseRedisRepository } from 'src/common/repositories';

@Injectable()
export class UserRedisRepository extends BaseRedisRepository {
  constructor(@InjectRedis() protected readonly redisClient: Redis) {
    super(redisClient);
  }
}
