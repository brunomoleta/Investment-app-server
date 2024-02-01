import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentTypeDto } from './create-investmentType.dto';

export class UpdateInvestmentTypeDto extends PartialType(CreateInvestmentTypeDto) {}
