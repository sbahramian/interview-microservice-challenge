import { hashSync } from 'bcrypt';

export class HashPasswordHelper {
  static getHash(input: string) {
    return hashSync(input, parseInt(process.env.JWT_SLAT));
  }
}

export class hashPassword extends HashPasswordHelper {}
