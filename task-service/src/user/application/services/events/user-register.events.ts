import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { USER_TOPIC_V1_CONSTANT } from 'src/common/constant/topics.constant';
import { RegisterUserUseCase } from '../../usecases/register-user.usecase';

@Injectable()
export class UserRegisterEventsService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;

  constructor(
    @InjectPinoLogger(UserRegisterEventsService.name) private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
    private readonly registerUserUseCase: RegisterUserUseCase,
  ) {
    const brokers = this.configService.get<string>('KAFKA_BROKERS', '');
    const kafkaBrokers = brokers ? brokers.split(',') : [];

    this.kafka = new Kafka({
      clientId: this.configService.get<string>('KAFKA_ID', 'nestjs-consumer'),
      brokers: kafkaBrokers,
    });
    this.consumer = this.kafka.consumer({ groupId: 'nestjs-group-client' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: USER_TOPIC_V1_CONSTANT.CREATED, fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        this.logger.info(`- ${prefix} ${message.key}#${message.value}`);

        const data = JSON.parse(message.value.toString());
        console.log('User Registered:', data);
        try {
          await this.registerUserUseCase.RegisterUserByEmail({
            user_id: data.user_id,
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            role: data.role,
          });
        } catch (error) {
          console.log(error);
        }
      },
    });

    this.logger.info('Kafka consumer connected');
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    this.logger.info('Kafka consumer disconnected');
  }
}
