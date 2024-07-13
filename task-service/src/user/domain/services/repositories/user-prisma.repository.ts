import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class UserPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async IsExist(data: Partial<User>): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        ...data,
      },
    });
    if (user) return true;
    return false;
  }

  public async IsEmailExist(email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user) return true;
    return false;
  }

  public async FindUserById(user_id: number): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });
  }

  public async FindOne(data: Partial<User>): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        ...data,
      },
    });
  }

  public async Count(): Promise<number> {
    return await this.prisma.user.count();
  }

  public async UpdateById(user_id: number, data: Partial<User>): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        ...data,
      },
    });
  }
}
