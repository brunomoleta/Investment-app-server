import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export enum Experience {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Expert = 'expert',
}

export class CreateAdvisorDto extends CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  @IsNotEmpty()
  @IsEnum(Experience)
  experience: Experience;

  @ApiProperty({
    type: String,
    description: 'Readonly property',
  })
  @IsString()
  speciality_id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
  bio: string;
}
