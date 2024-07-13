import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './delete-task.command';
import { DeleteTaskResponseInterface } from '../../../interfaces';
import { TaskPrismaRepository } from '../../../../domain/services/repositories';
import { localization } from 'src/common';
import { LocalizationMessage } from '../../../../infrastructure/localization/enum';
import { HttpStatus } from '@nestjs/common';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly taskPrismaRepository: TaskPrismaRepository) {}

  async execute(command: DeleteTaskCommand): Promise<DeleteTaskResponseInterface> {
    const { is_deleted } = await this.DeleteTask(command.taskId, command.lang);

    return { is_deleted };
  }

  async DeleteTask(taskId: number, lang: string): Promise<{ is_deleted: boolean }> {
    try {
      const exist = await this.CheckTaskExistById(taskId);

      if (!exist) {
        throw {
          ...localization.message(LocalizationMessage.ONBOARDING_ITEM_NOT_FOUND, { lang }, true, HttpStatus.NOT_FOUND),
        };
      }

      await this.taskPrismaRepository.DeleteById(taskId);

      return {
        is_deleted: true,
      };
    } catch (error) {
      return {
        is_deleted: false,
      };
    }
  }

  async CheckTaskExistById(taskId: number): Promise<boolean> {
    return await this.taskPrismaRepository.IsExist({
      id: taskId,
    });
  }
}
