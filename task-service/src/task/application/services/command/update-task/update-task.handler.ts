import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './update-task.command';
import { UpdateTask } from '../../../../infrastructure/interfaces';
import { localization } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum';
import { HttpStatus } from '@nestjs/common';
import { TaskPrismaRepository } from '../../../../domain/services/repositories';
import { UpdateTaskResponseInterface } from '../../../interfaces';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(private readonly taskPrismaRepository: TaskPrismaRepository) {}

  async execute(command: UpdateTaskCommand): Promise<UpdateTaskResponseInterface> {
    const is_updated = await this.updateTask(command.taskId, command.item_task, command.lang);

    return is_updated;
  }

  private async updateTask(taskId: number, task: UpdateTask, lang: string): Promise<{ is_updated: boolean }> {
    try {
      const exist = await this.checkTaskExistById(taskId);

      if (!exist) {
        throw {
          ...localization.message(LocalizationMessage.ONBOARDING_ITEM_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
        };
      }

      await this.taskPrismaRepository.UpdateById(taskId, { ...task });

      return {
        is_updated: true,
      };
    } catch (error) {
      return {
        is_updated: false,
      };
    }
  }

  private async checkTaskExistById(taskId: number): Promise<boolean> {
    return await this.taskPrismaRepository.IsExist({ id: taskId });
  }
}
