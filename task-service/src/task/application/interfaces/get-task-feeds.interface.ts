import { TaskStatus } from '@prisma/client';

export interface TaskFeedResponseInterface {
  taskId: number;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}

export interface TasksFeedResponseInterface {
  data: TaskFeedResponseInterface[];
  total: number;
}
