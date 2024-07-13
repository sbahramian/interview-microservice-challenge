import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  IsEmail,
  MinLength,
  Matches,
  IsNumber,
} from 'class-validator';
import { MetaDto, NoSpacesInEmail } from 'src/common';

export class VerifyCodeRequestDto {
  @ApiProperty({
    type: String,
    default: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(5)
  confirmation_code!: string;

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
    default: 'John',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  first_name!: string;

  @ApiProperty({
    type: String,
    default: 'Deo',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  last_name!: string;

  @ApiProperty({
    type: String,
    default: 'PassWORD123@',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  /* eslint-disable no-useless-escape */
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_])[a-zA-Z0-9\W\_]{8,}$/)
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

export class VerifyCodeDto {
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

export class VerifyCodeResponseDto {
  @ApiProperty({
    type: VerifyCodeDto,
  })
  data?: VerifyCodeDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}
