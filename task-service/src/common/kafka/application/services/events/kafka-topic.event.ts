import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, logLevel, Admin } from 'kafkajs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { USER_TOPIC_V1_CONSTANT } from 'src/common/constant/topics.constant';

@Injectable()
export class KafkaTopicEvent implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly clientId: string;
  private readonly kafka: Kafka;
  private readonly admin: Admin;
  private readonly kafkaNumberOfPartitions: number;
  private readonly kafkaReplicationFactor: number;
  private readonly kafkaBrokers: string[];

  constructor(
    @InjectPinoLogger(KafkaTopicEvent.name) private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {
    this.kafkaNumberOfPartitions = +config.get<number>('KAFKA_NUMBER_OF_PARTITIONS', 1);
    this.kafkaReplicationFactor = +config.get<number>('KAFKA_REPLICATION_FACTOR', 1);

    const brokers = config.get<string>('KAFKA_BROKERS', '');
    this.kafkaBrokers = brokers.split(',');

    this.clientId = 'topic-sync';
    this.kafka = new Kafka({
      clientId: this.clientId,
      brokers: this.kafkaBrokers,
      logLevel: logLevel.INFO,
    });

    this.admin = this.kafka.admin();
  }

  async onApplicationBootstrap() {
    try {
      const topics = await this.getMissedTopic();

      if (topics.length > 0) {
        this.logger.info(`${topics.length} topic on kafka missed!: ${topics} `);

        await this.admin.connect();
        await this.admin.createTopics({
          topics: topics.map((item) => {
            return {
              topic: item,
              numPartitions: this.kafkaNumberOfPartitions,
              replicationFactor: this.kafkaReplicationFactor,
            };
          }),
        });
      }

      this.logger.info(`Kafka ${this.clientId} connected`);
    } catch (error) {
      this.logger.error(`Error connecting kafka ${this.clientId}`, error);
      throw error;
    } finally {
      await this.admin.disconnect();
    }
  }

  async onApplicationShutdown() {
    try {
      await this.admin.disconnect();
      this.logger.info(`Kafka ${this.clientId} disconnected`);
    } catch (error) {
      this.logger.error(`Error disconnecting kafka ${this.clientId}`, error);
      throw error;
    }
  }

  private async getMissedTopic(): Promise<string[]> {
    const all_topics: string[] = [...Object.values(USER_TOPIC_V1_CONSTANT)];

    const exist_topics = await this.admin.listTopics();
    return all_topics.filter((topic) => !exist_topics.includes(topic));
  }
}
