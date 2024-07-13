export class GetTaskByIdQuery {
  constructor(
    public readonly taskId: number,
    public readonly lang: string,
  ) {}
}
