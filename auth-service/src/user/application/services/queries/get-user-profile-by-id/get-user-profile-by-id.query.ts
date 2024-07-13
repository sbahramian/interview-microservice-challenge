export class GetUserProfileByIdQuery {
  constructor(
    public readonly user_id: number,
    public readonly lang: string,
  ) {}
}
