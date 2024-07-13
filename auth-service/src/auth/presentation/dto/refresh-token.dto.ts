import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import { UserProfileResponseDto } from './verify-code.dto';
import { MetaDto } from 'src/common';

export class RefreshTokenRequestDto {
  @ApiProperty({
    type: String,
    default:
      'U2FsdGVkX19daityr+5jeG6gDUrY+RrucJc8aN4bn70mZp5JlLrRCNTc7iw6MogiMJfJ3TG45hStDAP7ug2Lri4G99Ug91FVNqgBADix/tYLRtqcGpxHvJHQgezgwwAs7m31qqPMcXdF8TKwf3Q8PoFY7PHoyf24wLbeZF71pcfMJmzEaW1JB5Zn6mzC6iCEITPaeyhuF/MH42JCnZMXzA==',
  })
  @IsString()
  @IsDefined()
  refresh_token!: string;
}

export class RefreshTokenDto {
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

export class RefreshTokenResponseDto {
  @ApiProperty({
    type: RefreshTokenDto,
  })
  data?: RefreshTokenDto;

  @ApiProperty({
    type: MetaDto,
  })
  meta!: MetaDto;
}
