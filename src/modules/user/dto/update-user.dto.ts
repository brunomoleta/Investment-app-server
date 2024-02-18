import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { UpdateAdminDto } from '../../admin/dto/update-admin.dto';

export class UpdateUserDto extends UpdateAdminDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  @IsString()
  @Length(11, 11)
  phone_number!: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  @IsString()
  @IsOptional()
  image: string;
}
