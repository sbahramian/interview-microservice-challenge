import { TaskStatus } from '@prisma/client';

export interface TaskByIdResponseInterface {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}
