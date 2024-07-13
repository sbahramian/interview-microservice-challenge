import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTaskQuery } from './get-task.query';
import { TasksMap } from '../../../map';
import { TaskPrismaRepository } from '../../../../domain/services/repositories';
import { TaskResponseInterface, TasksResponseInterface } from '../../../interfaces';
import { Task } from '@prisma/client';

@QueryHandler(GetTaskQuery)
export class GetTaskHandler implements IQueryHandler<GetTaskQuery> {
  constructor(private readonly taskPrismaRepository: TaskPrismaRepository) {}

  async execute(query: GetTaskQuery): Promise<TasksResponseInterface> {
    const [items, total] = await Promise.all([this.getTasks(query.userId), this.getTasksCount(query.userId)]);

    const data = (await TasksMap.items(items)) as TaskResponseInterface[];

    return {
      data,
      total,
    };
  }

  private async getTasks(userId: number): Promise<Task[]> {
    return await this.taskPrismaRepository.FindAll(userId, 1, 100);
  }

  private async getTasksCount(userId: number): Promise<number> {
    return await this.taskPrismaRepository.Count(userId);
  }
}
