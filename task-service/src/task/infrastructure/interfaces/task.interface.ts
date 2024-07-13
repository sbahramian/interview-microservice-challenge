import { TaskStatus } from '@prisma/client';
import { MetaInterface } from 'src/common';

export interface TaskFeed {
  id: number;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}

export interface TasksFeed {
  data: TaskFeed[];
}

export interface TasksFeedResponse extends TasksFeed {
  meta: MetaInterface;
}

export interface Task {
  taskId: number;
  userId: number;
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}

export interface TaskResponse {
  data: Task;
  meta: MetaInterface;
}

export interface Tasks {
  data: Task[];
}

export interface TasksResponse extends Tasks {
  meta: MetaInterface;
}

export interface TaskId {
  taskId: number;
}

export class NewTask {
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}

export class UpdateTask {
  title: string;
  description: string;
  status: TaskStatus;
  due?: Date;
}

export interface TaskUpdateResponse {
  data: {
    id: number;
    is_updated: boolean;
  };
  meta: MetaInterface;
}

export interface TaskDeleteResponse {
  data: {
    id: number;
    is_deleted: boolean;
  };
  meta: MetaInterface;
}

export interface TaskDestroyResponse {
  data: {
    id: string;
    is_destroyed: boolean;
  };
  meta: MetaInterface;
}

export interface TaskRestoreResponse {
  data: {
    id: string;
    is_restored: boolean;
  };
  meta: MetaInterface;
}
