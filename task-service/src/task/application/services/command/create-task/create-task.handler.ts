import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { TaskMap } from '../../../map';
import { CreateTaskResponseInterface } from '../../../interfaces';
import { TaskPrismaFactory } from '../../../../domain/services/factories';
import { localization } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum';
import { HttpStatus } from '@nestjs/common';
import { TaskPrismaRepository } from 'src/task/domain/services/repositories';
import { Task, TaskStatus } from '@prisma/client';
import { NewTask } from 'src/task/infrastructure/interfaces';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly taskPrismaFactory: TaskPrismaFactory,
    private readonly taskPrismaRepository: TaskPrismaRepository,
  ) {}

  async execute(command: CreateTaskCommand): Promise<CreateTaskResponseInterface> {
    const new_task_item = (await this.createTask(command.userId, command.new_task, command.lang)) as Task;
    const data = (await TaskMap.item(new_task_item)) as unknown as Task;

    return data;
  }

  private async createTask(userId: number, item: NewTask, lang: string): Promise<Task> {
    try {
      return await this.taskPrismaFactory.Create({
        title: item.title,
        description: item.description,
        due: item.due,
        userId: userId,
        status: TaskStatus.pending,
      });
    } catch (error) {
      if (error?.response?.meta) throw error;
      localization.message(
        LocalizationMessage.INTERNAL_SERVER_ERROR,
        { lang },
        true,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
