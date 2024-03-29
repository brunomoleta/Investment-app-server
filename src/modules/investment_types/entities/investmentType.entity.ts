import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../../decorators/constants';

export class InvestmentType {
  @ApiProperty({
    type: String,
    description: 'Readonly property',
    example: Constants.INVESTMENT_ID,
  })
  readonly id: string;

  @ApiProperty({
    type: String,
    description: 'Required property',
    example: Constants.INVESTMENT_NAME,
  })
  type_name!: string;

  @ApiProperty({
    type: String,
    description:
      "Required property. It can be either: 'low',\n" +
      ",'moderate',\n" +
      ",'high',\n" +
      "or 'very_high'.",
    example: Constants.INVESTMENT_RISK,
  })
  risk!: string;
}
