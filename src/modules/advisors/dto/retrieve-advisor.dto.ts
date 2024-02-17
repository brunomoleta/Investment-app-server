import { CreateAdvisorDto } from './create-advisor.dto';
import { ApiProperty } from '@nestjs/swagger';
import { InvestmentType } from '../../investment_types/entities/investmentType.entity';
import { Investor } from '../../investors/entities/investor.entity';

export class RetrieveAdvisorDto extends CreateAdvisorDto {
  @ApiProperty({
    type: InvestmentType,
    isArray: false,
    description: 'It will come from the investment_type relationship',
  })
  speciality: string;

  @ApiProperty({
    type: Investor,
    isArray: true,
    description: "Investor's with this advisor's id.",
  })
  investors: Investor[];
}
