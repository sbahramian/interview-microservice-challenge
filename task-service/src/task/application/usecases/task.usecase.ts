import { HttpStatus, Injectable } from '@nestjs/common';
import { NewTask, UpdateTask, TaskResponse, TasksResponse } from '../../infrastructure/interfaces';
import { LocalizationMessage } from '../../infrastructure/localization/enum';
import {
  TaskDeleteResponse,
  TaskUpdateResponse,
  TasksFeedResponse,
} from '../../infrastructure/interfaces/task.interface';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetTaskFeedQuery } from '../services/query/get-task-feed';
import { GetTaskQuery } from '../services/query/get-task';
import { GetTaskByIdQuery } from '../services/query/get-task-by-id';
import { CreateTaskCommand } from '../services/command/create-task';
import { DeleteTaskCommand } from '../services/command/delete-task';
import { UpdateTaskCommand } from '../services/command/update-task';
import { localization } from 'src/common';

@Injectable()
export class TaskUseCase {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  public async GetTaskFeed(lang: string): Promise<TasksFeedResponse> {
    try {
      const { data, total } = await this.queryBus.execute(new GetTaskFeedQuery());

      return {
        data: data.length > 0 ? data : null,
        meta: {
          pagination: {
            total: total,
          },
          ...localization.message(LocalizationMessage.GET_ONBOARDING_FEEDS, { lang }),
        },
      };
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

  public async GetTasks(userId: number, lang: string): Promise<TasksResponse> {
    try {
      const { data, total } = await this.queryBus.execute(new GetTaskQuery(userId));

      return {
        data: data.length > 0 ? data : null,
        meta: {
          pagination: {
            total: total,
          },
          ...localization.message(LocalizationMessage.GET_ONBOARDING_LIST, { lang }),
        },
      };
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

  public async GetTaskById(taskId: number, lang: string): Promise<TaskResponse> {
    try {
      const data = await this.queryBus.execute(new GetTaskByIdQuery(taskId, lang));

      return {
        data,
        meta: {
          ...localization.message(LocalizationMessage.GET_ONBOARDING_INFORMATION, { lang }),
        },
      };
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

  public async CreateTask(userId: number, new_task: NewTask, lang: string): Promise<TaskResponse> {
    try {
      const data = await this.commandBus.execute(new CreateTaskCommand(userId, new_task, lang));

      return {
        data,
        meta: {
          ...localization.message(LocalizationMessage.CREATE_ONBOARDING_SUCCESSFULLY, { lang }),
        },
      };
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

  public async UpdateTask(taskId: number, item_task: UpdateTask, lang: string): Promise<TaskUpdateResponse> {
    try {
      const is_updated = await this.commandBus.execute(new UpdateTaskCommand(taskId, item_task, lang));

      return {
        data: {
          id: taskId,
          is_updated,
        },
        meta: {
          ...localization.message(LocalizationMessage.UPDATING_ONBOARDING_SUCCESSFULLY, { lang }),
        },
      };
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

  public async DeleteTask(taskId: number, lang: string): Promise<TaskDeleteResponse> {
    try {
      const is_deleted = await this.commandBus.execute(new DeleteTaskCommand(taskId, lang));

      return {
        data: {
          id: taskId,
          is_deleted,
        },
        meta: {
          ...localization.message(LocalizationMessage.UPDATING_ONBOARDING_SUCCESSFULLY, { lang }),
        },
      };
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
