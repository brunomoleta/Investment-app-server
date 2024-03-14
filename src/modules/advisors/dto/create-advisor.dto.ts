import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Constants } from '../../../decorators/constants';

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
    example: 'advanced',
  })
  @IsNotEmpty()
  @IsEnum(Experience)
  experience: Experience;

  @ApiProperty({
    type: String,
    description: 'Readonly property',
    example: Constants.SPECIALITY_ID,
  })
  @IsString()
  speciality_id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_BIO,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(240)
  bio: string;
}
