import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { hashSync } from 'bcryptjs';
import { Constants } from '../../../decorators/constants';

export class UpdatePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_PASSWORD,
  })
  @IsNotEmpty()
  @IsString()
  currentPassword!: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_NEWPASSWORD,
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
  newPassword!: string;
}
