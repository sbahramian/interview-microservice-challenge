import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { MetaDto } from 'src/common';

export class GetTaskFeedsDto {
  @ApiProperty({
    type: String,
    default: 'Item title',
  })
  title!: string;

  @ApiProperty({
    type: String,
    default: 'Item description',
  })
  description!: string;

  @ApiProperty({
    type: String,
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @ApiProperty({
    type: Date,
  })
  due?: Date;

  @ApiProperty({
    type: Number,
    default: 1,
  })
  userId!: number;
}

export class GetTaskFeedsResponseDto {
  @ApiProperty({
    type: [GetTaskFeedsDto],
  })
  data!: GetTaskFeedsDto[];

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class GetTasksDto extends GetTaskFeedsDto {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  taskId!: number;
}

export class GetTaskResponseDto {
  @ApiProperty({
    type: GetTasksDto,
  })
  data!: GetTasksDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class GetTasksResponseDto {
  @ApiProperty({
    type: [GetTasksDto],
  })
  data!: GetTasksDto[];

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class GetTaskIdRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  taskId!: number;
}

export class AddNewTaskRequestDto {
  @ApiProperty({
    type: String,
    default: 'Item title',
  })
  title!: string;

  @ApiProperty({
    type: String,
    default: 'Item description',
  })
  description!: string;

  @ApiProperty({
    type: String,
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @ApiProperty({
    type: Date,
  })
  due?: Date;
}

export class UpdateTaskDto extends AddNewTaskRequestDto {}

export class UpdateTasksDto {
  @ApiProperty({
    type: Number,
  })
  id!: number;

  @ApiProperty({
    type: Boolean,
  })
  is_updated!: boolean;
}

export class UpdateTasksResponseDto {
  @ApiProperty({
    type: UpdateTasksDto,
  })
  data!: UpdateTasksDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class GetVersionRequestDto {
  @ApiProperty({
    type: String,
    default: 'v1.0',
  })
  version!: string;
}

export class DeleteTaskDto {
  @ApiProperty({
    type: Number,
  })
  id!: number;

  @ApiProperty({
    type: Boolean,
  })
  is_deleted!: boolean;
}

export class DeleteTasksResponseDto {
  @ApiProperty({
    type: DeleteTaskDto,
  })
  data!: DeleteTaskDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}

export class DestroyTaskDto {
  @ApiProperty({
    type: String,
  })
  id!: string;

  @ApiProperty({
    type: Boolean,
  })
  is_destroyed!: boolean;
}

export class RestoreTaskDto {
  @ApiProperty({
    type: String,
  })
  id!: string;

  @ApiProperty({
    type: Boolean,
  })
  is_restored!: boolean;
}
