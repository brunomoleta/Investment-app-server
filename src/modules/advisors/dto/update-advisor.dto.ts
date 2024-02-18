import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Experience } from './create-advisor.dto';

export class UpdateAdvisorDto extends UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  @IsNotEmpty()
  @IsEnum(Experience)
  experience?: Experience;

  @ApiPropertyOptional({
    type: String,
    description: 'Readonly property',
  })
  @IsString()
  speciality_id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Optional property',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
  bio?: string;
}
