import { TaskStatus } from '@prisma/client';

export interface TaskResponseInterface {
  taskId: number;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}

export interface TasksResponseInterface {
  data: TaskResponseInterface[];
  total: number;
}
