import { InvestmentType } from './entities/investmentType.entity';
import { RetrieveInfo } from '../advisors/advisors';

export interface RetrieveInvestmentTypes {
  investment_types: InvestmentType[];
  info: RetrieveInfo;
}
