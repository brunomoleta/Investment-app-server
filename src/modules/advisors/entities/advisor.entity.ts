import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '../dto/create-advisor.dto';

export class Advisor extends User {
  @ApiProperty({
    type: String,
    description:
      'Required property. It has to be one of the following: beginner, intermediate, advanced, expert',
  })
  experience!: Experience;

  @ApiProperty({
    type: String,
    description:
      'Required property and it has to be one of the existing investment_type id.',
  })
  speciality_id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  bio: string;

  constructor() {
    super();
    this.access_type = 'advisor';
  }
}
