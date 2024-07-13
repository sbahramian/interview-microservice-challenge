import { CreateTaskCommand, CreateTaskHandler } from './create-task';
import { UpdateTaskCommand, UpdateTaskHandler } from './update-task';
import { DeleteTaskCommand, DeleteTaskHandler } from './delete-task';

export const CommandHandlers = [
  // Handler
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
  // Command
  CreateTaskCommand,
  UpdateTaskCommand,
  DeleteTaskCommand,
];
