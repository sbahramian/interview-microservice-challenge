export class DeleteTaskCommand {
  constructor(
    public readonly taskId: number,
    public readonly lang: string,
  ) {}
}
