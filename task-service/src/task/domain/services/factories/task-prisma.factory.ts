import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../prisma';
import { CreateTaskResponseInterface } from 'src/task/application/interfaces';

@Injectable()
export class TaskPrismaFactory {
  constructor(private readonly prisma: PrismaService) {}

  public async Create(data: CreateTaskResponseInterface): Promise<Task> {
    return this.prisma.task.create({ data });
  }
}
