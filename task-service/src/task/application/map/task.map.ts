import { Task } from '@prisma/client';
import { TaskResponseInterface } from '../interfaces';

export class TaskMap {
  static async item(task: Task): Promise<TaskResponseInterface> {
    return {
      taskId: task.id,
      title: task.title,
      description: task.description,
      due: task.due || null,
      userId: task.userId,
      status: task.status,
    };
  }
}
