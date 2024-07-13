import { Task } from '@prisma/client';
import { TaskFeedResponseInterface } from '../interfaces';

export class TaskFeedsMap {
  static async feeds(Tasks: Task[]): Promise<TaskFeedResponseInterface[]> {
    return Tasks.map((item) => ({
      taskId: item.id,
      title: item.title,
      description: item.description,
      due: item.due,
      userId: item.userId,
      status: item.status,
    }));
  }
}
