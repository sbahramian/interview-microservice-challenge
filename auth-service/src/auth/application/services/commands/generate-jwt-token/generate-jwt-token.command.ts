import { JwtPayloadInterface } from '../../../../infrastructure/interfaces';

export class GenerateJwtTokenCommand {
  constructor(public readonly payload: JwtPayloadInterface) {}
}
