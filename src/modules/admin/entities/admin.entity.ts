import { Exclude } from 'class-transformer';
import { randomUUID } from 'node:crypto';
import { ApiProperty } from '@nestjs/swagger';

export class Admin {
  @ApiProperty({
    type: String,
    description: 'Readonly property',
  })
  readonly id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  name!: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Readonly property',
  })
  @Exclude()
  readonly access_type: string;

  constructor() {
    this.id = randomUUID();
    this.access_type = 'admin';
  }
}
