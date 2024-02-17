import { Admin } from '../../admin/entities/admin.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User extends Admin {
  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  phone_number!: string;

  @ApiProperty({
    type: String,
    description: 'Readonly property',
  })
  readonly created_at!: string;

  @ApiProperty({
    type: String,
    description: 'Readonly property',
  })
  readonly updated_at!: string;

  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  image?: string;

  constructor() {
    super();
  }
}
