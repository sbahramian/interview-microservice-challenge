import { UpdateUserProfileInterface } from '../../../interfaces';

export class UpdateUserProfileCommand {
  constructor(
    public readonly user_id: number,
    public readonly dto: UpdateUserProfileInterface,
    public readonly lang: string,
  ) {}
}
