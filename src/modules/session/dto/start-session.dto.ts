import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../../decorators/constants';

export class StartSessionDto {
  @ApiProperty({
    type: String,
    description: 'Required property.',
    example: Constants.USER_EMAIL,
  })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({
    type: String,
    description: 'Required property.',
    example: Constants.USER_PASSWORD,
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
