import { CreateInvestmentTypeDto } from '../../investment_types/dto/create-investmentType.dto';
import { Advisor } from '../../advisors/entities/advisor.entity';

export class RetrieveInvestorDto extends CreateInvestmentTypeDto {
  advisor: Advisor;
}
