import { ApiProperty } from '@nestjs/swagger';
import { MessageDto } from './message.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class MetaPaginationDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  total?: number;

  @ApiProperty({
    type: Number,
  })
  @IsOptional()
  count_page?: number;

  @ApiProperty({
    type: Number,
  })
  @IsOptional()
  current_page?: number;

  @ApiProperty({
    type: Number || null,
  })
  @IsOptional()
  next_page?: number | null;

  @ApiProperty({
    type: Number || null,
  })
  @IsOptional()
  previous_page?: number | null;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  per_page?: number;

  @ApiProperty({
    type: Number || null,
  })
  @IsOptional()
  from?: number | null;

  @ApiProperty({
    type: Number || null,
  })
  @IsOptional()
  to?: number | null;
}

export class MetaDto {
  @ApiProperty({
    type: Date,
  })
  server_time?: Date;

  @ApiProperty({
    type: Boolean,
    default: false,
  })
  has_error?: boolean = false;

  @ApiProperty({
    type: [MessageDto],
  })
  message!: MessageDto[];

  @ApiProperty({
    type: MetaPaginationDto,
  })
  pagination?: MetaPaginationDto;
}
