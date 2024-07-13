import { TokenTypeEnum } from '../../../../../common';

export class DeleteJwtTokenCommand {
  constructor(
    public readonly token: string,
    public readonly type: TokenTypeEnum,
  ) {}
}
