import { CreateInvestmentTypeDto } from './create-investmentType.dto';
import { RetrieveAdvisorDto } from '../../advisors/dto/retrieve-advisor.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Advisor } from '../../advisors/entities/advisor.entity';

export class RetrieveAllInvestmentTypesDto extends CreateInvestmentTypeDto {
  @ApiProperty({
    type: Advisor,
    isArray: true,
    description: 'All advisors who are specialized in this investment type.',
  })
  advisors: RetrieveAdvisorDto[];
}
