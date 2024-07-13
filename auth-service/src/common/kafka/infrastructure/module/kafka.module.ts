import { Global, Module } from '@nestjs/common';
import { KafkaTopicEvent } from '../../application/services/events';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [KafkaTopicEvent],
  exports: [],
})
export class KafkaModule {}
