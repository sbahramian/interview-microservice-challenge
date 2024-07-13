import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTaskFeedQuery } from './get-task-feed.query';
import { TaskFeedsMap } from '../../../map';
import { TaskFeedResponseInterface } from '../../../interfaces';
import { TaskPrismaRepository } from '../../../../domain/services/repositories';
import { TasksFeedResponseInterface } from '../../../interfaces/get-task-feeds.interface';
import { Task } from '@prisma/client';

@QueryHandler(GetTaskFeedQuery)
export class GetTaskFeedHandler implements IQueryHandler<GetTaskFeedQuery> {
  constructor(private readonly taskPrismaRepository: TaskPrismaRepository) {}

  async execute(): Promise<TasksFeedResponseInterface> {
    const [items, total] = await Promise.all([this.getTasksByQuery(), this.getTasksCountByQuery()]);

    const data = (await TaskFeedsMap.feeds(items)) as TaskFeedResponseInterface[];

    return {
      data,
      total,
    };
  }

  private async getTasksByQuery(): Promise<Task[]> {
    return await this.taskPrismaRepository.FindAll(0, 1, 100);
  }

  private async getTasksCountByQuery(): Promise<number> {
    return await this.taskPrismaRepository.Count(0);
  }
}
