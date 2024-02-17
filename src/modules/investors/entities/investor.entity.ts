import { User } from '../../user/entities/user.entity';
import { InvestmentAmount } from '../dto/create-investor.dto';
import { ApiProperty } from '@nestjs/swagger';

export class Investor extends User {
  @ApiProperty({
    type: String,
    description:
      "Required property. It has to be one of the following: 'starter',\n" +
      "'well-rounded',\n" +
      "'multimillionaire',\n" +
      "or 'wealthy'",
  })
  amount!: InvestmentAmount;

  @ApiProperty({
    type: String,
    description:
      'Required property. It has to be one of the existing advisor_id.',
  })
  advisor_id!: string;

  @ApiProperty({
    type: String,
    description: 'Property defined at the constructor.',
  })
  access_type: string;

  constructor() {
    super();
    this.access_type = 'investor';
  }
}
