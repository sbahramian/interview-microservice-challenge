import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { MetaDto, NoSpacesInEmail } from 'src/common';

export class SingInRequestDto {
  @ApiProperty({
    type: String,
    default: 'john.deo@mail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @NoSpacesInEmail({ message: 'Email number cannot contain spaces.' })
  email!: string;

  @ApiProperty({
    type: String,
    default: 'PassWORD123@',
  })
  @IsNotEmpty()
  password!: string;
}

export class UserProfileResponseDto {
  @ApiProperty({
    type: String,
    default: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  user_id!: number;

  @ApiProperty({
    type: String,
    default: 'https://d2wn6f04lhvy4g.cloudfront.net/users/assets/10.png',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  avatar!: string;

  @ApiProperty({
    type: String,
    default: 'John',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  first_name!: string;

  @ApiProperty({
    type: String,
    default: 'Deo',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  last_name!: string;
}

export class SingInDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsDefined()
  access_token!: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsDefined()
  refresh_token!: string;

  @ApiProperty({
    type: UserProfileResponseDto,
  })
  user!: UserProfileResponseDto;
}

export class SingInResponseDto {
  @ApiProperty({
    type: SingInDto,
  })
  data?: SingInDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}
