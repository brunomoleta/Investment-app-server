import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '../dto/create-advisor.dto';
import { Constants } from '../../../decorators/constants';

export class Advisor extends User {
  @ApiProperty({
    type: String,
    description:
      'Required property. It has to be one of the following: beginner, intermediate, advanced, expert',
    example: 'advanced',
  })
  experience!: Experience;

  @ApiProperty({
    type: String,
    description:
      'Required property and it has to be one of the existing investment_type id.',
    example: 'bcb13332-303f-4c3a-83d5-9264f836b565',
  })
  speciality_id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_BIO,
  })
  bio: string;

  constructor() {
    super();
    this.access_type = 'advisor';
  }
}
