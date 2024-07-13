export class GetMeQuery {
  constructor(
    public readonly user_id: number,
    public readonly lang: string,
  ) {}
}
