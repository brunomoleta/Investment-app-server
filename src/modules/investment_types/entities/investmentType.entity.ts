import { ApiProperty } from '@nestjs/swagger';

export class InvestmentType {
  @ApiProperty({
    type: String,
    description: 'Readonly property',
  })
  readonly id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
  })
  type_name!: string;

  @ApiProperty({
    type: String,
    description:
      "Required property. It can be either: 'low',\n" +
      ",'moderate',\n" +
      ",'high',\n" +
      "or 'very_high'.",
  })
  risk!: string;
}
