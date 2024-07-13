import { Task } from '@prisma/client';
import { TaskResponseInterface } from '../interfaces';

export class TasksMap {
  static async items(Tasks: Task[]): Promise<TaskResponseInterface[]> {
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
