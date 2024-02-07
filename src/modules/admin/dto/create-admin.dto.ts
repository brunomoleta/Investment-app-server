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

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(64)
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsString()
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
