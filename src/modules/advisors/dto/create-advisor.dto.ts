import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


enum Experience {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Expert = 'expert'
}


export class CreateInvestorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Experience)

  experience: Experience = Experience.Beginner;
}