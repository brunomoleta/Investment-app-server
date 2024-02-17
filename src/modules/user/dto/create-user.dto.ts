import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto extends CreateAdminDto {
  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  @IsString()
  @Length(11, 11)
  phone_number!: string;

  @ApiProperty({
    type: String,
    description: 'This is an optional property',
  })
  @IsString()
  @IsOptional()
  image: string;
}
