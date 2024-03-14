import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcryptjs';
import { Constants } from '../../../decorators/constants';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_NAME,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(64)
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_EMAIL,
  })
  email!: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_PASSWORD,
  })
  @IsString()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password does not contain one lowercase letter or more.',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password does not contain one uppercase letter or more.',
  })
  @Matches(/^(?=.*\d)/, {
    message: 'Password does not contain one number. or more',
  })
  @Matches(/^(?=.*[!@#$%^&*()_+])/, {
    message: 'Password does not contain one special character or more.',
  })
  @Transform(({ value }: { value: string }) => hashSync(value), {
    groups: ['transform'],
  })
  password!: string;
}
