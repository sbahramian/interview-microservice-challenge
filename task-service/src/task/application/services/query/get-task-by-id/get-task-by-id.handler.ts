import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTaskByIdQuery } from './get-task-by-id.query';
import { TaskMap } from '../../../map';
import { TaskPrismaRepository } from '../../../../domain/services/repositories';
import { localization } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum';
import { HttpStatus } from '@nestjs/common';
import { TaskByIdResponseInterface } from '../../../interfaces';
import { Task } from '@prisma/client';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(private readonly taskPrismaRepository: TaskPrismaRepository) {}

  async execute(query: GetTaskByIdQuery): Promise<TaskByIdResponseInterface> {
    const task = await this.getTaskById(query.taskId, query.lang);
    const data = (await TaskMap.item(task)) as unknown as Task;

    return data;
  }

  private async getTaskById(taskId: number, lang: string): Promise<Task> {
    const task = await this.taskPrismaRepository.FindOne({ id: taskId });

    if (!task) {
      throw {
        ...localization.message(LocalizationMessage.ONBOARDING_ITEM_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
      };
    }

    return task;
  }
}
