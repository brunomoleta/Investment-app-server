import { CreateInvestmentTypeDto } from './create-investmentType.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Advisor } from '../../advisors/entities/advisor.entity';

export class RetrieveInvestmentTypeDto extends CreateInvestmentTypeDto {
  @ApiProperty({
    type: Advisor,
    isArray: true,
    description: 'All advisors who are specialized in this investment type.',
  })
  advisors: Advisor[];
}
