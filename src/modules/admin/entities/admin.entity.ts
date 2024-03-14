import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../../decorators/constants';

export class Admin {
  @ApiProperty({
    type: String,
    description: 'Readonly property',
    example: Constants.USER_ID,
  })
  readonly id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_NAME,
  })
  name!: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_EMAIL,
  })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Readonly property',
  })
  @Exclude()
  access_type: string;

  constructor() {
    this.id = randomUUID();
    this.access_type = 'admin';
  }
}
