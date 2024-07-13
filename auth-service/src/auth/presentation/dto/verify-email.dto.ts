import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsEmail } from 'class-validator';
import { MetaDto, NoSpacesInEmail } from 'src/common';
export class SignUpRequestDto {
  @ApiProperty({
    type: String,
    default: 'john.deo@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @NoSpacesInEmail({ message: 'Email cannot contain spaces.' })
  email!: string;
}

export class VerifyEmailDto {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsDefined()
  ttl!: number;
}

export class SignUpResponseDto {
  @ApiProperty({
    type: VerifyEmailDto,
  })
  data?: VerifyEmailDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}
