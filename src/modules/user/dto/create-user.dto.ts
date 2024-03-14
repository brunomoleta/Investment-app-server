import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { Constants } from '../../../decorators/constants';

export class CreateUserDto extends CreateAdminDto {
  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_PHONE,
  })
  @IsString()
  @Length(11, 11)
  phone_number!: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
    example: Constants.USER_IMAGE,
  })
  @IsString()
  @IsOptional()
  image: string;
}
