import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class TaskPrismaRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async IsExist(data: Partial<Task>): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        ...data,
      },
    });
    if (user) return true;
    return false;
  }

  public async FindAll(userId: number, skip: number, take: number): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        title: 'asc',
      },
      skip,
      take,
    });
  }

  public async Count(userId: number): Promise<number> {
    return await this.prisma.task.count({
      where: {
        userId: userId,
      }
    });
  }

  public async DeleteById(taskId: number): Promise<boolean> {
    const user = await this.prisma.user.delete({
      where: {
        id: taskId,
      },
    });
    if (user) return true;
    return false;
  }

  public async FindTaskById(id: number): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: {
        id: id,
      },
    });
  }

  public async FindOne(data: Partial<Task>): Promise<Task> {
    return await this.prisma.task.findFirst({
      where: {
        ...data,
      },
    });
  }

  public async UpdateById(user_id: number, data: Partial<Task>): Promise<Task> {
    return await this.prisma.task.update({
      where: {
        id: user_id,
      },
      data: {
        ...data,
      },
    });
  }
}
