import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


enum InvestmentAmount {
  Starter = 'starter',
  WellRounded = 'well-rounded',
  Multimillionaire = 'multimillionaire',
  Wealthy = 'wealthy'
}

export class CreateInvestorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InvestmentAmount)

  amount: InvestmentAmount = InvestmentAmount.Starter;
}