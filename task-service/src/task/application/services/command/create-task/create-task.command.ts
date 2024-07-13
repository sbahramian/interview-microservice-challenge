import { NewTask } from '../../../../infrastructure/interfaces';

export class CreateTaskCommand {
  constructor(
    public readonly userId: number,
    public readonly new_task: NewTask,
    public readonly lang: string,
  ) {}
}
