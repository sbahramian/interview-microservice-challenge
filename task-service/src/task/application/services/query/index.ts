import { GetTaskFeedHandler, GetTaskFeedQuery } from './get-task-feed';
import { GetTaskHandler, GetTaskQuery } from './get-task';
import { GetTaskByIdHandler, GetTaskByIdQuery } from './get-task-by-id';

export const QueryHandlers = [
  // Handler
  GetTaskHandler,
  GetTaskByIdHandler,
  GetTaskFeedHandler,
  // Query
  GetTaskQuery,
  GetTaskFeedQuery,
  GetTaskByIdQuery,
];
