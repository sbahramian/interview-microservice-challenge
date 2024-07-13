import { UpdateTask } from '../../../../infrastructure/interfaces';

export class UpdateTaskCommand {
  constructor(
    public readonly taskId: number,
    public readonly item_task: UpdateTask,
    public readonly lang: string,
  ) {}
}
