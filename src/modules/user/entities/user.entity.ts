import { Admin } from '../../admin/entities/admin.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Constants } from '../../../decorators/constants';

export class User extends Admin {
  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.USER_PHONE,
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
    example: Constants.USER_IMAGE,
  })
  image?: string;

  constructor() {
    super();
  }
}
