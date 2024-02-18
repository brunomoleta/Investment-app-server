import { CreateAdminDto } from './create-admin.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcryptjs';

export class UpdateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(64)
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  name?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(64)
  @IsEmail()
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  email?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
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
  password?: string;
}
