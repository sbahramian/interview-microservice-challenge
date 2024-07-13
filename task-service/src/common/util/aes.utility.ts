import { AES, enc } from 'crypto-js';
import * as crypto from 'crypto';
import { JWT_AES_TEXT_CONSTANT } from '../constant';

export class AesUtility {
  public async Encrypt(text: string): Promise<string> {
    return AES.encrypt(text, JWT_AES_TEXT_CONSTANT).toString();
  }

  public async Decrypt(cipherText: string): Promise<string> {
    return AES.decrypt(cipherText, JWT_AES_TEXT_CONSTANT).toString(enc.Utf8);
  }

  public async GenerateAndEncryptToken(len: number): Promise<string> {
    const token = await this.generateToken(len);
    return this.Encrypt(token);
  }

  private async generateToken(len: number): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(len, (err, buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer.toString('hex'));
        }
      });
    });
  }
}
