import { TaskStatus } from '@prisma/client';

export interface CreateTaskResponseInterface {
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}
