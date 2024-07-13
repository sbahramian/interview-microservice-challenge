import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma';
import { NewUserInterface } from 'src/user/application/interfaces';

@Injectable()
export class UserPrismaFactory {
  constructor(private readonly prisma: PrismaService) {}

  public async Create(data: NewUserInterface): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
