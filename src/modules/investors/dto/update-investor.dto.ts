import { CreateInvestorDto } from './create-investor.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateInvestorDto extends PartialType(CreateInvestorDto) {}
