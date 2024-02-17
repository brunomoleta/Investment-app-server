import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartSessionDto {
  @ApiProperty({
    type: String,
    description: 'Required property.',
  })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({
    type: String,
    description: 'Required property.',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
}
