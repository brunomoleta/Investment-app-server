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
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Experience)
  experience: Experience = Experience.Beginner;

  @IsString()
  speciality_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
  bio: string;
}
